import { PropsWithChildren } from "react";

export default function EstudoLayout({ children }: PropsWithChildren) {
  // Layout sem header e footer para tela inteira
  return <>{children}</>;
}

