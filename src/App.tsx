import Main from "./component/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./component/Banner";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1d68d4",
          colorInfo: "#1d68d4",
          colorSuccess: "#3da30b",
          sizeStep: 4,
          colorLink: "#0752bf",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main children={<Banner />} />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
