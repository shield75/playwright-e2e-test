import { test as baseTest, expect } from '@playwright/test';
import { severity as allureSeverity, epic as allureEpic, feature as allureFeature, story as allureStory, owner as allureOwner, tag as allureTag } from 'allure-js-commons';

// Default metadata object
export const defaultMetadata = {
  owner: 'Anisur Rahman',
  severity: 'critical',      // possible: 'blocker', 'critical', 'normal', 'minor', 'trivial'
  epic: 'Swag Lab Automation',
  feature: 'Default Feature',
  story: 'Default Story',
  tags: ['Regression', 'Smoke'],
};

// Extend base test
export const test = baseTest.extend({});

// Helper to apply metadata dynamically
export function addAllureMetadata(meta?: Partial<typeof defaultMetadata>) {
  const data = { ...defaultMetadata, ...meta };
  allureOwner(data.owner);
  allureSeverity(data.severity);
  allureEpic(data.epic);
  allureFeature(data.feature);
  allureStory(data.story);
  data.tags.forEach(t => allureTag(t));
}

export { expect };
