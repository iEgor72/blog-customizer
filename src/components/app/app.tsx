import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [articleParams, setArticleParams] = useState(defaultArticleState);
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleParams.fontFamilyOption.value,
          '--font-size': articleParams.fontSizeOption.value,
          '--font-color': articleParams.fontColor.value,
          '--container-width': articleParams.contentWidth.value,
          '--bg-color': articleParams.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onApply={setArticleParams} />
      <Article />
    </main>
  );
};
