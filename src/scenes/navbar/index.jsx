import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  Close,
} from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { AiOutlineSearch } from "react-icons/ai"
import { BsFillSunFill } from "react-icons/bs"
import { BiSolidMoon } from "react-icons/bi"
import { BiMessageDetail } from "react-icons/bi"
import { IoIosNotifications } from "react-icons/io"
import { BiSolidHelpCircle } from "react-icons/bi"
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [searchResults, setSearchResults] = useState([]);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const [searchQuery, setSearchQuery] = useState('');
  const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

  const handleSearch = async () => {
    if (!searchQuery) {
      return;
    }

    await axios
      .get(`${baseUrl}/users/${searchQuery}/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSearchResults(res.data);
        localStorage.setItem('searchResults', JSON.stringify(res.data));
        navigate(`/search/${searchQuery}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleSearch()
  }, [searchResults]);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <div
          onClick={() => navigate("/home")}
          className="Social-Name"
        >
          SocialCircle
        </div>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <input
              type="text"
              className="search-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
            <AiOutlineSearch
              className="nav-icon"
              onClick={handleSearch}
            ></AiOutlineSearch>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <div onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "light" ? (
              <BsFillSunFill className="nav-icon" />
            ) : (
              <BiSolidMoon className="nav-icon" />
            )}
          </div>
          <div>
            <BiMessageDetail className="nav-icon" />
          </div>
          <div>
            <IoIosNotifications className="nav-icon" />
          </div>
          <div>
            <BiSolidHelpCircle className="nav-icon" />
          </div>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <div onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "light" ? (
                <BsFillSunFill className="nav-icon" />
              ) : (
                <BiSolidMoon className="nav-icon" />
              )}
            </div>
            <div>
              <BiMessageDetail className="nav-icon" />
            </div>
            <div>
              <IoIosNotifications className="nav-icon" />
            </div>
            <div>
              <BiSolidHelpCircle className="nav-icon" />
            </div>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
