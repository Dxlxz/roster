import { type SkillManifest } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

import { type UniversalFlatSkill } from 'src/engine/workspace-manager/workspace-migration/universal-flat-entity/types/universal-flat-skill.type';

export const fromFlatSkillToSkillManifest = ({
  flatSkill,
}: {
  flatSkill: Pick<
    UniversalFlatSkill,
    | 'universalIdentifier'
    | 'name'
    | 'label'
    | 'icon'
    | 'description'
    | 'content'
  >;
}): SkillManifest => ({
  universalIdentifier: flatSkill.universalIdentifier,
  name: flatSkill.name,
  label: flatSkill.label,
  ...(isDefined(flatSkill.icon) ? { icon: flatSkill.icon } : {}),
  ...(isDefined(flatSkill.description)
    ? { description: flatSkill.description }
    : {}),
  content: flatSkill.content,
});
