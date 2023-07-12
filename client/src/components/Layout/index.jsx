import React, { useMemo } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Footbar from "components/Footbar";
// import ErrorToast from "components/ErrorToast";
import { useMediaQuery } from "hooks/useMediaQuery";

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
    const isMobile = useMediaQuery("(max-width: 375px)");

    const headerStyle = useMemo(
        () => ({
            display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
            width: "100%",
            height: "48px",
            backgroundColor: "#111827",
            padding: "8px 64px",
        }),
        []
    );

    const footerStyle = useMemo(
        () => ({
            display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
            width: "100%",
            height: "85px",
            color: "#FFFFFF",
            backgroundColor: "#111827",
            flexShrink: "0",
        }),
        []
    );

    const contentStyle = useMemo(
        () => ({
            height: "calc(100vh - 48px - 85px)",
            padding: "0 50px",
            width: isMobile ? "100%" : "375px",
        }),
        [isMobile]
    );

    return (
        <Layout>
            <Header style={headerStyle}>
                <Navbar />
            </Header>
            <Content style={contentStyle}>Content</Content>
            <Footer style={footerStyle}>
                <Footbar />
            </Footer>
        </Layout>
    );
}
