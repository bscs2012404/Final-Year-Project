import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Layout, Row, Col } from "antd";

import Sidebar from "./components/menu/Sidebar";
import MenuHeader from "./components/header";
import MenuFooter from "./components/footer";
import CustomiseTheme from "./components/customise";
import ScrollTop from "./components/scroll-to-top";
import { Fab, Tooltip } from "@mui/material";
import { AddSquare } from "iconsax-react";
import FeedBackModal from "../view/main/dashboard/Feedback/Feedbackmodal";

const { Content } = Layout;

export default function VerticalLayout(props) {
    const { children } = props;

    const [visible, setVisible] = useState(false);
    const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

    const handleClose = () => {
        setOpenFeedbackModal(false);
    };
    const handleOpen = () => {
        setOpenFeedbackModal(true);
    };

    const FeedbackModalProps = {
        open: openFeedbackModal,
        handleClose,
        handleCreateFeedback: handleClose
    };
    // Redux
    const customise = useSelector(state => state.customise)
    const user = useSelector(state => state.auth.user)
    console.log(user)

    return (
        <Layout className="hp-app-layout">
            <Sidebar visible={visible} setVisible={setVisible} />

            <Layout className="hp-bg-black-20 hp-bg-color-dark-90">
                <MenuHeader setVisible={setVisible} />

                <Content className="hp-content-main">
                    <Row justify="center">
                        {
                            customise.contentWidth === "full" && (
                                <Col xxl={17} xl={22} span={24}>
                                    {children}
                                </Col>
                            )
                        }

                        {
                            customise.contentWidth === "boxed" && (
                                <Col className="hp-w-100" style={{ maxWidth: 936 }}>
                                    {children}
                                </Col>
                            )
                        }
                    </Row>
                </Content>
                {user?.role !== 'admin' &&
                    <Tooltip title={'Feedback'}>
                        <Fab color="primary" onClick={handleOpen} sx={{ position: 'absolute', left: '20%', top: '80%' }}>
                            <AddSquare />
                        </Fab>
                    </Tooltip>
                }
                <FeedBackModal {...FeedbackModalProps} />

                <MenuFooter />
            </Layout>

            <CustomiseTheme />

            <ScrollTop />
        </Layout>
    );
};