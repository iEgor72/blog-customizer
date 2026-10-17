import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [draftParams, setDraftParams] = useState(defaultArticleState);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event: MouseEvent): void => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return (): void => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleChange = (key: keyof ArticleStateType, option: OptionType): void => {
    setDraftParams((previous) => ({ ...previous, [key]: option }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(draftParams);
  };
  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setDraftParams(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((previous) => !previous)} />
      <aside
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
        inert={!isOpen}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={draftParams.fontFamilyOption}
            onChange={(option) => handleChange('fontFamilyOption', option)}
          />
          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={draftParams.fontSizeOption}
            onChange={(option) => handleChange('fontSizeOption', option)}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={draftParams.fontColor}
            onChange={(option) => handleChange('fontColor', option)}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={draftParams.backgroundColor}
            onChange={(option) => handleChange('backgroundColor', option)}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={draftParams.contentWidth}
            onChange={(option) => handleChange('contentWidth', option)}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
