import React, { Component, Fragment } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SchoolIcon from "@material-ui/icons/School";
import HomeIcon from "@material-ui/icons/Home";
import CodeIcon from "@material-ui/icons/Code";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";

import { logout } from "../Components/Store/Auth/Actions";

const mapStateToProps = state => ({});
const mapDispatchToProps = { logout };

const drawerWidth = 240;
const navItems = [
  {
    title: "Trang chủ",
    to: "/",
    icon: "home"
  },
  {
    title: "Khóa học",
    to: "/khoa-hoc",
    icon: "school"
  },
  {
    title: "Mã trắc nghiệm",
    to: "/ma-trac-nghiem",
    icon: "code"
  },
  {
    title: "Thành viên",
    to: "/thanh-vien",
    icon: "account"
  }
];
const navIcons = {
  home: HomeIcon,
  school: SchoolIcon,
  code: CodeIcon,
  account: SupervisorAccountIcon
};

const customTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#57975b",
      main: "#2e7d32",
      dark: "#205723"
    },
    secondary: {
      light: "#3398c0",
      main: "#007FB1",
      dark: "#00587b"
    }
  },
  overrides: {
    MuiCard: {
      root: {
        overflow: "none"
      }
    }
  }
});

const styles = theme => ({
  root: {
    display: "flex",
    height: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    flexFlow: "column"
  }
});

const NavItem = props => {
  const { icon, to, title, pathName } = props;
  const Icon = navIcons[icon];
  return (
    <ListItem button component={Link} to={to} selected={to === pathName}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

class Layout extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { container, location, children, classes, logout } = this.props;
    const pathName = location.pathname;
    const { mobileOpen } = this.state;

    const drawer = (
      <Fragment>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {navItems.map(item => (
            <NavItem
              key={item.to}
              to={item.to}
              title={item.title}
              icon={item.icon}
              pathName={pathName}
            />
          ))}
        </List>
        <Divider />
        <ListItem button onClick={() => logout()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"Đăng xuất"} />
        </ListItem>
      </Fragment>
    );

    return (
      <ThemeProvider theme={customTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Admin
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </ThemeProvider>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
