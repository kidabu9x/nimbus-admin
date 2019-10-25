import React, { Component, Fragment } from "react";
import { compose } from "recompose";
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

const drawerWidth = 240;

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

class Layout extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const {
      container,
      location: { pathName },
      children,
      classes
    } = this.props;
    const { mobileOpen } = this.state;

    const drawer = (
      <Fragment>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button component={Link} to="/" selected={"/" === pathName}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Trang chủ"} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/khoa-hoc"
            selected={"/khoa-hoc" === pathName}
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={"Khóa học"} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/ma-trac-nghiem"
            selected={"/ma-trac-nghiem" === pathName}
          >
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary={"Mã trắc nghiệm"} />
          </ListItem>
        </List>
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
)(Layout);
