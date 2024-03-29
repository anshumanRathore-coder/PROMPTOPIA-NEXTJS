import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/global.css";

export const meadata = {
  title: "Promptopia",
  desciption: "Discover & Share AI Prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main ">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
