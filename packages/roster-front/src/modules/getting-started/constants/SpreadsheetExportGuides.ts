import { doNotTranslate } from 'roster-shared/i18n';
import {
  IconBrandHubspot,
  IconBrandPipedrive,
  IconBrandSalesforce,
} from 'roster-ui/icon';

export const SPREADSHEET_EXPORT_GUIDES = [
  {
    name: doNotTranslate('HubSpot'),
    Icon: IconBrandHubspot,
    url: 'https://knowledge.hubspot.com/import-and-export/export-records',
  },
  {
    name: doNotTranslate('Salesforce'),
    Icon: IconBrandSalesforce,
    url: 'https://help.salesforce.com/s/articleView?id=platform.admin_exportdata.htm&type=5',
  },
  {
    name: doNotTranslate('Pipedrive'),
    Icon: IconBrandPipedrive,
    url: 'https://support.pipedrive.com/en/article/exporting-data-from-pipedrive',
  },
];
