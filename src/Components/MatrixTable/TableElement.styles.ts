import { TableElementStyleProps, TableElementStyles } from '@udecode/slate-plugins';

export const getTableElementStyles = ({
  className,
}: TableElementStyleProps): TableElementStyles => {
  return {
    root: [
      {
        // Insert css properties
        margin: '10px 0',
        borderCollapse: 'collapse',
        width: '5%',
        display: 'inline',
        contenteditable:"false"      
      },
      className,
    ],
  };
};
