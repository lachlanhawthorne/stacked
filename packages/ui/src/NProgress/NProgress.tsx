import {} from "twin.macro";
import { useNProgress } from '@tanem/react-nprogress'
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  isFinished: boolean;
  animationDuration: number;
}

interface BarProps extends PropsWithChildren {
  progress: number;
  animationDuration: number;
}

function Container({ isFinished, children, animationDuration }: ContainerProps) {
  return (
    <div
      tw="pointer-events-none transition-opacity"
      style={{ 
        animationDuration: `${animationDuration}ms`,
        opacity: isFinished ? 0 : 1,
      }}
    >
      {children}
    </div>
  )
}

function Bar({ progress, children, animationDuration }: BarProps) {
  return (
    <div
      tw="bg-white min-h-[3px] left-0 fixed top-0 transition-['margin-left'] w-full z-50"
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        animationDuration: `${animationDuration}ms`
      }}
    >
      {children}
    </div>
  )
}


export const NProgress: React.FC<{ isRouteChanging: boolean }> = ({
  isRouteChanging,
}) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  })

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  )
}