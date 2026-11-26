import { describe, expect, it, vi } from 'vitest';

import { findWorkspaceMemberIdsByEmails } from 'src/logic-functions/data/find-workspace-member-ids-by-emails';

const buildClient = (
  pages: {
    edges: { node: { id: string; userEmail: string } }[];
    endCursor?: string;
  }[],
) => {
  const queryMock = vi.fn();

  for (const page of pages) {
    queryMock.mockResolvedValueOnce({
      workspaceMembers: {
        edges: page.edges,
        pageInfo: {
          hasNextPage: page.endCursor !== undefined,
          endCursor: page.endCursor ?? null,
        },
      },
    });
  }

  return {
    client: { query: queryMock },
    queryMock,
  };
};

describe('findWorkspaceMemberIdsByEmails', () => {
  it('should map lowercased emails to member ids', async () => {
    const { client } = buildClient([
      {
        edges: [
          { node: { id: 'member-ada', userEmail: 'Ada@roster.com' } },
          { node: { id: 'member-bob', userEmail: 'bob@roster.dev' } },
        ],
      },
    ]);

    const { workspaceMemberIdByEmail, ambiguousEmailCount } =
      await findWorkspaceMemberIdsByEmails(client, {
        emails: ['Ada@roster.com', 'bob@roster.dev'],
      });

    expect(workspaceMemberIdByEmail.get('ada@roster.dev')).toBe('member-ada');
    expect(workspaceMemberIdByEmail.get('bob@roster.dev')).toBe('member-bob');
    expect(ambiguousEmailCount).toBe(0);
  });

  it('should ask only for the roster emails through case-insensitive matches', async () => {
    const { client, queryMock } = buildClient([{ edges: [] }]);

    await findWorkspaceMemberIdsByEmails(client, {
      emails: ['Ada@roster.com', 'bob@roster.dev'],
    });

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0][0].workspaceMembers.__args.filter).toEqual({
      or: [
        { userEmail: { ilike: 'ada@roster.dev' } },
        { userEmail: { ilike: 'bob@roster.dev' } },
      ],
    });
  });

  it('should escape like wildcards inside the looked up emails', async () => {
    const { client, queryMock } = buildClient([{ edges: [] }]);

    await findWorkspaceMemberIdsByEmails(client, {
      emails: ['john_doe@roster.dev'],
    });

    expect(queryMock.mock.calls[0][0].workspaceMembers.__args.filter).toEqual({
      or: [{ userEmail: { ilike: 'john\\_doe@roster.dev' } }],
    });
  });

  it('should not query at all when the roster has no vouched email', async () => {
    const { client, queryMock } = buildClient([]);

    const { workspaceMemberIdByEmail, ambiguousEmailCount } =
      await findWorkspaceMemberIdsByEmails(client, { emails: [] });

    expect(queryMock).not.toHaveBeenCalled();
    expect(workspaceMemberIdByEmail.size).toBe(0);
    expect(ambiguousEmailCount).toBe(0);
  });

  it('should drop an email shared by two members and report it', async () => {
    const { client } = buildClient([
      {
        edges: [
          { node: { id: 'member-ada', userEmail: 'shared@roster.dev' } },
          { node: { id: 'member-bob', userEmail: 'Shared@roster.com' } },
          { node: { id: 'member-carol', userEmail: 'carol@roster.dev' } },
        ],
      },
    ]);

    const { workspaceMemberIdByEmail, ambiguousEmailCount } =
      await findWorkspaceMemberIdsByEmails(client, {
        emails: ['shared@roster.dev', 'carol@roster.dev'],
      });

    expect(workspaceMemberIdByEmail.has('shared@roster.dev')).toBe(false);
    expect(workspaceMemberIdByEmail.get('carol@roster.dev')).toBe(
      'member-carol',
    );
    expect(ambiguousEmailCount).toBe(1);
  });

  it('should follow pagination within one batch of emails', async () => {
    const { client, queryMock } = buildClient([
      {
        edges: [{ node: { id: 'member-ada', userEmail: 'ada@roster.dev' } }],
        endCursor: 'cursor-2',
      },
      { edges: [{ node: { id: 'member-bob', userEmail: 'bob@roster.dev' } }] },
    ]);

    const { workspaceMemberIdByEmail } = await findWorkspaceMemberIdsByEmails(
      client,
      { emails: ['ada@roster.dev', 'bob@roster.dev'] },
    );

    expect(workspaceMemberIdByEmail.size).toBe(2);
    expect(queryMock.mock.calls[1][0].workspaceMembers.__args.after).toBe(
      'cursor-2',
    );
  });
});
