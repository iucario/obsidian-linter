import MoveTagsToYaml from '../src/rules/move-tags-to-yaml';
import {NormalArrayFormats, SpecialArrayFormats} from '../src/utils/yaml';
import dedent from 'ts-dedent';
import {ruleTest} from './common';

ruleTest({
  RuleBuilderClass: MoveTagsToYaml,
  testCases: [
    {
      testName: 'Nothing happens when there is no tag in the content of the text',
      before: dedent`
        # Title
      `,
      after: dedent`
        # Title
      `,
    },
    {
      testName: 'Creates multi-line array tag when missing',
      before: dedent`
        #test
      `,
      after: dedent`
        ---
        tags:
          - test
        ---
        #test
      `,
      options: {
        tagArrayStyle: NormalArrayFormats.MultiLine,
      },
    },
    {
      testName: 'Creates single-line array tags when missing',
      before: dedent`
        #test
      `,
      after: dedent`
        ---
        tags: [test]
        ---
        #test
      `,
    },
    {
      testName: 'Creates single string tag when missing',
      before: dedent`
        #test
      `,
      after: dedent`
        ---
        tags: test
        ---
        #test
      `,
      options: {
        tagArrayStyle: SpecialArrayFormats.SingleStringToMultiLine,
      },
    },
    {
      testName: 'Creates multi-line array tags when empty',
      before: dedent`
        ---
        tags: ${''}
        ---
        #test
      `,
      after: dedent`
        ---
        tags:
          - test
        ---
        #test
      `,
      options: {
        tagArrayStyle: NormalArrayFormats.MultiLine,
      },
    },
    {
      testName: 'Creates single-line array tags when empty',
      before: dedent`
        ---
        tags: ${''}
        ---
        #test
      `,
      after: dedent`
        ---
        tags: [test]
        ---
        #test
      `,
    },
    {
      testName: 'Nothing happens when the tags in the body are covered by the tags in the yaml already',
      before: dedent`
        ---
        tags: test
        ---
        #test
      `,
      after: dedent`
        ---
        tags: test
        ---
        #test
      `,
      options: {
        tagArrayStyle: SpecialArrayFormats.SingleStringToSingleLine,
      },
    },
  ],
});
