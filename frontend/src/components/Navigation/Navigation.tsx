import * as React from 'react';
// Material UI
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
// Router
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const modules = [
    { id: "Dashboard", icon: <DashboardIcon /> },
    { id: "Administration", icon: <AdminPanelSettingsIcon /> },
    { id: "Profile", icon: <AssignmentIndIcon /> }
];

const navLinkActivated: { color: string } = {
    color: '#0073E7'
};

const navLinkInative: { color: string } = {
    color: '#333'
};

export function Navigation({ ...props }) {

    const theme = useTheme();

    const handleDrawerClose = () => {
        props.setOpen(false);
    };

    return (
        <>
            <Drawer variant="permanent" open={props.open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {<ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {modules.map((module, index) => (
                        <ListItemButton
                            key={module.id}
                            sx={{
                                minHeight: 48,
                                justifyContent: props.open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: props.open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <NavLink to={module.id.toLowerCase()} style={({ isActive }) => isActive ? navLinkActivated : navLinkInative}>{module.icon}</NavLink>
                            </ListItemIcon>
                            <ListItemText primary={module.id} sx={{ opacity: props.open ? 1 : 0 }} />
                        </ListItemButton>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItemButton
                        key={'Support'}
                        sx={{
                            minHeight: 48,
                            justifyContent: props.open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: props.open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <NavLink to="support" style={({ isActive }) => isActive ? navLinkActivated : navLinkInative}><ContactSupportIcon /></NavLink>
                        </ListItemIcon>
                        <ListItemText primary={'Support'} sx={{ opacity: props.open ? 1 : 0 }} />
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    )
}