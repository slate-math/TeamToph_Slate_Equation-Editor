import { TableElementStyleProps, TableElementStyles } from '@udecode/slate-plugins';

export const getTableElementStyles = ({
  className,
}: TableElementStyleProps): TableElementStyles => {
  return {
    root: [
      {
        // Insert css properties
        margin: '10px',
        borderCollapse: 'collapse',
        width: 'auto',
        contenteditable:"false",
      },
      className,
    ],
  };
};
