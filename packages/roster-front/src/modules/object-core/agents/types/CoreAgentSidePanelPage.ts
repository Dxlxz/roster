import { type SidePanelPages } from 'roster-shared/types';

export type CoreAgentSidePanelPage =
  | SidePanelPages.AgentCoreTriggerType
  | SidePanelPages.AgentCoreTrigger
  | SidePanelPages.AgentCoreDataAccess
  | SidePanelPages.AgentCoreTools
  | SidePanelPages.AgentCoreTest;
