const { useMediaQuery } = require("react-responsive");

const useResponsive = () => {
  const isSmall = useMediaQuery({ minWidth: 640 });
  const isMedium = useMediaQuery({ minWidth: 768 });
  const isLarge = useMediaQuery({ minWidth: 1024 });
  const isExtraLarge = useMediaQuery({ minWidth: 1280 });
  const is2ExtraLarge = useMediaQuery({ minWidth: 1536 });

  return {
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    is2ExtraLarge,
  };
};

export default useResponsive;
