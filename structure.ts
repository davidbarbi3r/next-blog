import Iframe from "sanity-plugin-iframe-pane";
import type { DefaultDocumentNodeResolver } from "sanity/desk";

// ...all other list items
export const getDefaultDeocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (schemaType === "post") {
    return S.document().views([
      S.view.form(), //here's the default vue

      S.view //here's the view we add to add Iframe preview in preview mode so that we don't need to open another window
        .component(Iframe)
        .options({
          url: `${
            process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
          }/api/preview`,
          defaultSize: `desktop`, // default `desktop`
          // Optional: Add a reload button, or reload on new document revisions
          reload: {
            button: true, // default `undefined`
            revision: undefined, // boolean | number. default `undefined`. If a number is provided, add a delay (in ms) before the automatic reload on document revision
          },
          attributes: {
            allow: "fullscreen", // string, optional
            // referrerPolicy: "strict-origin-when-cross-origin", // string, optional
            // sandbox: "allow-same-origin", // string, optional
          },
        })
        .title("Preview"),
    ]);
  }
};
