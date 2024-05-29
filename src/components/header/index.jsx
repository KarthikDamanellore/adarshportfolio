"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Box, Modal, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menuData } from "@/constants";
import {
    headerContainerStyles,
    popOverStyles,
    avartarStyles,
    modalStyles,
} from "@/components/header/styles";
import logo from "@/assets/images/avatar.svg";
import Image from "next/image";

const Header = (props) => {
    // props
    const { setMenuItem, content, openModal, setOpenModal, customModalStyles } =
        props;

    // states:
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleFileDownload = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = url.split("/").pop();
        link.click();
    };

    const renderLeftSection = () => {
        return (
            <Image
                src={logo}
                width={100}
                height={100}
                alt="logo"
                style={{ borderRadius: "50%" }}
            />
        );
    };

    const renderRightSection = () => {
        return (
            // <Avatar
            //     sx={avartarStyles}
            //     alt="Adarsh Damanellore"
            //     src="/static/images/avatar/1.jpg"
            //     onClick={(event) => setAnchorEl(event.currentTarget)}
            // />
            <Avatar
                sx={{ bgcolor: deepOrange[500], cursor: "pointer" }}
                onClick={(event) => setAnchorEl(event.currentTarget)}>
                A
            </Avatar>
        );
    };

    const renderPopupSection = () => {
        return (
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}>
                <Box sx={popOverStyles}>
                    {menuData?.map((item, index) => {
                        return (
                            <List
                                key={index}
                                onClick={() => {
                                    if (index === 3) {
                                        handleFileDownload(item.file);
                                    } else {
                                        setAnchorEl(null);
                                        setMenuItem(item?.title);
                                        setOpenModal(true);
                                    }
                                }}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item?.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item?.title} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        );
                    })}
                </Box>
            </Popover>
        );
    };

    const renderModalSection = () => {
        return (
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{ ...modalStyles, ...customModalStyles }}>
                    {content}
                </Box>
            </Modal>
        );
    };
    return (
        <Box sx={headerContainerStyles}>
            {renderLeftSection()}
            {renderRightSection()}
            {renderPopupSection()}
            {renderModalSection()}
        </Box>
    );
};

export default Header;
