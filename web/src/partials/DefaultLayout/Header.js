import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import {
  ADMIN_MENU_ITEMS,
  ADMIN_ROLE,
  DEFAULT_MENU_ITEMS,
  USER_ROLE,
} from "../../constants";
import { BiSearch, BiSolidUser } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout, AiOutlineProfile } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { logOutAction } from "../../redux/actions/authActions";
import SearchInput from "../../components/SearchInput";

export default function Header({ noRole }) {
  const [menuItems, setMenuItems] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const styles = useStyles(theme);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setAnchorEl(null);
    };
  }, []);

  useEffect(() => {
    if (!noRole && auth.isLogedIn && auth.user?.role === ADMIN_ROLE) {
      setMenuItems(ADMIN_MENU_ITEMS);
    } else {
      setMenuItems(DEFAULT_MENU_ITEMS);
    }
  }, [auth.isLogedIn, auth.user, auth, noRole]);

  const handleClickMenuItem = (link, event, openChildren) => {
    if (openChildren) {
      setAnchorEl(event.currentTarget);
    }

    if (openChildren === undefined) {
      setAnchorEl(null);
    }

    if (link) {
      navigate(link);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logOutAction());
  };

  return (
    <header style={styles.header}>
      <Container sx={styles.header__container}>
        <Typography
          sx={styles.header__logo}
          variant="h4"
          component="h1"
          onClick={() => handleClickMenuItem("/")}
        >
          Cinema
        </Typography>
        {(noRole || auth.user?.role !== ADMIN_ROLE) && !matchDownSm && (
          <SearchInput />
        )}
        <Button sx={styles["header__user-button"]} startIcon={<BiSolidUser />}>
          {auth.isLogedIn ? (
            <>
              <Typography
                aria-controls={anchorEl ? "user-menu" : undefined}
                aria-haspopup={"true"}
                aria-expanded={anchorEl ? "true" : undefined}
                onClick={(event) => handleClickMenuItem("", event, true)}
              >
                {auth.user?.fullname}
              </Typography>
              <Menu
                anchorEl={anchorEl}
                id={"user-menu"}
                open={Boolean(anchorEl?.innerText === auth.user?.fullname)}
                onClose={handleCloseMenu}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: styles["header__user-menu"],
                  },
                }}
                transformOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom",
                }}
              >
                <MenuList>
                  {auth.user?.role === USER_ROLE && (
                    <MenuItem
                      onClick={() =>
                        handleClickMenuItem(`/profile/${auth.user.id}/info`)
                      }
                      key={"user-profile"}
                    >
                      <ListItemIcon sx={styles["header__user-icon"]}>
                        <AiOutlineProfile />
                      </ListItemIcon>
                      <ListItemText>Thông tin cá nhân</ListItemText>
                    </MenuItem>
                  )}
                  {auth.user?.role === ADMIN_ROLE && (
                    <MenuItem
                      onClick={() => handleClickMenuItem("/admin/users")}
                      key={"user-profile"}
                    >
                      <ListItemIcon sx={styles["header__user-icon"]}>
                        <MdManageAccounts />
                      </ListItemIcon>
                      <ListItemText>Trang quản lý</ListItemText>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout} key={"log-out"}>
                    <ListItemIcon sx={styles["header__user-icon"]}>
                      <AiOutlineLogout />
                    </ListItemIcon>
                    <ListItemText>Đăng xuất</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Typography onClick={() => handleClickMenuItem("/auth")}>
              Đăng ký/Đăng nhập
            </Typography>
          )}
        </Button>
      </Container>
      <Container sx={{ pb: 1 }}>{matchDownSm && <SearchInput />}</Container>
      <nav>
        <Box sx={styles.nav}>
          <Container sx={styles.nav__container}>
            {menuItems &&
              menuItems.map((menuItem, index) => {
                return (
                  <Box key={menuItem.content} sx={styles.nav__item}>
                    <Button
                      onClick={(event) =>
                        handleClickMenuItem(
                          menuItem.href,
                          event,
                          menuItem.children ? true : false,
                        )
                      }
                      sx={styles.nav__button}
                      aria-controls={anchorEl ? menuItem.content : undefined}
                      aria-haspopup={"true"}
                      aria-expanded={anchorEl ? "true" : undefined}
                    >
                      {menuItem.content}
                      {menuItem.children && <FaChevronDown size={10} />}
                    </Button>
                    {menuItem.children && (
                      <Menu
                        anchorEl={anchorEl}
                        id={menuItem.content}
                        open={Boolean(
                          anchorEl?.innerText ===
                            menuItem.content.toUpperCase(),
                        )}
                        onClose={handleCloseMenu}
                        slotProps={{
                          paper: {
                            elevation: 0,
                            sx: styles.nav__menu,
                          },
                        }}
                        transformOrigin={{
                          horizontal: "center",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "center",
                          vertical: "bottom",
                        }}
                      >
                        {menuItem.children.map((menuItemChild) => {
                          return (
                            <MenuItem
                              onClick={() =>
                                handleClickMenuItem(menuItemChild.href)
                              }
                              key={menuItemChild.content}
                            >
                              {menuItemChild.content}
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    )}
                    {index !== menuItems.length - 1 && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={styles.nav__divider}
                        variant="middle"
                      />
                    )}
                  </Box>
                );
              })}
          </Container>
        </Box>
      </nav>
    </header>
  );
}

const useStyles = (theme) => {
  return {
    header: {},
    header__container: {
      display: "flex",
      alignItems: "end",
      justifyContent: "space-between",
      paddingTop: "1rem",
      paddingBottom: "1rem",
    },
    header__logo: {
      fontWeight: "bold",
      textTransform: "uppercase",
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontStyle: "normal",
      cursor: "pointer",
    },
    "header__user-button": {
      textTransform: "none",
      display: "flex",
      alignItems: "flex-start",
      color: theme.palette.primary.main,
    },
    "header__user-menu": {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
    "header__user-icon": {
      minWidth: "1.5rem !important",
    },
    nav: {
      backgroundColor: theme.palette.primary.main,
    },
    nav__container: {
      display: "flex",
      justifyContent: "space-between",
    },
    nav__item: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    nav__button: {
      paddingTop: "1rem",
      paddingBottom: "1rem",
      display: "flex",
      gap: ".25rem",
      color: "white",
      fontWeight: "medium",
      transition: "all 300ms ease",
      "&:hover": {
        color: theme.palette.primary.hoverText,
      },
      width: "100%",
    },
    nav__menu: {
      borderRadius: 0,
      bgcolor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      width: 230,
    },
    nav__divider: {
      backgroundColor: theme.palette.primary.contrastText,
    },
  };
};
