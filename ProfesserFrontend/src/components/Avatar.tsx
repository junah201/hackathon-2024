import { Avatar as MuiAvatar } from '@mui/material';

const { VITE_CDN_URL } = import.meta.env;

interface AvatarProps {
  src: string;
  alt: string;
  sx?: any;
}

const Avatar = ({ src, alt, sx = {} }: AvatarProps) => {
  return (
    <MuiAvatar
      alt={alt}
      src={`${VITE_CDN_URL}/${src}`}
      sx={{
        ...sx,
      }}
    />
  );
};

export default Avatar;
