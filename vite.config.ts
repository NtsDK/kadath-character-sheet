import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react-swc";
// import checker from "vite-plugin-checker";


// https://stackoverflow.com/questions/77616517/make-tsyringe-decorators-works-with-vite
// https://timtech.blog/posts/transform-typescript-legacy-decorators-vite-swc-plugin/
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react({
      tsDecorators: true,
      useAtYourOwnRisk_mutateSwcOptions(options) {
        options.jsc!.transform!.legacyDecorator = true;
        options.jsc!.transform!.decoratorMetadata = true;
        options.jsc!.transform!.useDefineForClassFields = false;
      },
    }),
    // checker({
    //   typescript: {
    //     tsconfigPath: "./tsconfig.app.json",
    //   },
    // }),
  ],
});
