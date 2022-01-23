import React from 'react';
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemProps,
  styled,
  ListItemButton,
} from '@mui/material';
import { Maybe } from '@/common/CommonTypes';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';

const StyledListItemText = styled(ListItemText)({
  '.MuiListItemText-secondary': {
    wordBreak: 'break-word',
  },
});

export type ListItemWithAvatarProps<C extends React.ElementType> =
  ListItemProps<
    C,
    {
      component?: C;
      avatarUrl: string;
      primaryText: React.ReactText;
      secondaryText?: Maybe<React.ReactText>;
    }
  >;

function ListItemButtonWithAvatar<C extends React.ElementType>({
  avatarUrl,
  primaryText,
  secondaryText,
  ...rest
}: ListItemWithAvatarProps<C>) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <ListItemButton alignItems="flex-start" dense {...rest}>
      <ListItemAvatar>
        <Avatar src={getImageUrl(avatarUrl)} alt={'Avatar'} />
      </ListItemAvatar>
      <StyledListItemText primary={primaryText} secondary={secondaryText} />
    </ListItemButton>
  );
}

export default ListItemButtonWithAvatar;
