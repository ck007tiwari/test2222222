import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

import { Stack } from "@mui/system";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  // docName: [],
  // docType: [],
  // document: [],
  cAddressS1: "",
  cAddressS2: "",
  pAddressS1: "",
  pAddressS2: "",
};

// let today = new Date().toISOString();
// today = today.split("T")[0];
// console.log(today);
//! how it is working
let minD;
let eighteenYearsAgo = new Date();
eighteenYearsAgo = eighteenYearsAgo.setFullYear(
  eighteenYearsAgo.getFullYear() - 18
);
minD = new Date(eighteenYearsAgo);
minD = new Date(minD).toISOString();
minD = minD.split("T")[0];

const UserDetail = () => {
  const [formData, setFormData] = useState(initialValues);
  const [isPermanentCurrentAdd, setIsPermanentCurrentAdd] = useState(false);
  const [calenderError, setCalenderError] = useState(false);
  const [docName, setDocName] = useState([]);
  const [docType, setDocType] = useState([]);
  const [document, setDocument] = useState([]);
  const [resetKey, setResetKey] = useState("");

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  //?for all the input fields handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "sameas") {
      setIsPermanentCurrentAdd(!isPermanentCurrentAdd);
      return;
    } else if (name === "dateOfBirth") {
      if (value < minD) {
        let temp = { ...formData };
        temp = { ...temp, [name]: value };
        setFormData(temp);
        setCalenderError(false);
      } else {
        setCalenderError(true);
        return;
      }
    }
    if (isPermanentCurrentAdd) {
      let temp = { ...formData };
      temp = {
        ...temp,
        pAddressS1: formData.cAddressS1,
        pAddressS2: formData.cAddressS2,
      };
      setFormData(temp);
    }
    let temp = { ...formData };
    temp = { ...temp, [name]: value };
    setFormData(temp);
    // console.log("handle-Change", name, value, Math.random());
  };

  //?for input as file handeFileChange
  const handleFileChange = (e) => {
    const { name, value } = e.target;
    console.log("name-", name, "values-", value);
    if (name === "docName") {
      setDocName((prev) => [...prev, value]);
    } else if (name === "docType") {
      setDocType((prev) => [...prev, value]);
    }
  };

  const handleFiles = (e) => {
    let objFile = e.target.files;
    if (Object.keys(objFile).length >= 2) {
      setDocument((prev) => [...prev, objFile]);
    } else alert("Minimum 2 file required");
  };
  //?for icons clicked this fun run
  const handleClick = (e) => {
    if (e === "add") inputRef1.current.click();
    else if (e === "delete") {
      setResetKey(Math.random());
    }
  };

  //!handle Submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (calenderError) {
      for (let index = 0; index < document.length; index++) {
        //     let temp = { ...formData };
        //     temp = { ...temp, `docName${[i]}`: docName[i] };
        //     setFormData(temp);
      }
      alert("Min age should be 18Y");
      return;
    }

    // isPermanentCurrentAdd:false
    // firstName:ckjdf
    // lastName:tiwari
    // email:tiwari@gmail.com
    // dateOfBirth:2004-06-28
    // cAddressS1:skjdkf aksjdfk kajsdf
    // cAddressS2:jkajd kajsdkf aksjdf
    // pAddressS1:new delhi
    // pAddressS2:New Delhi
    // docType[0]:image
    // docName[0]:doc1
    // docType[1]:image
    // docName[1]:doc2

    let finalTemp = {
      ...formData,
      document,
      isPermanentCurrentAdd,
    };
    // POST request using fetch()
    fetch("http://reactnodejstest.xicom.us/api/v1/user/document-submit", {
      method: "POST",
      body: finalTemp,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      // Converting to JSON
      .then((response) => response.json())
      // Displaying results to console
      .then((json) => console.log(json));
    // axios
    //   .post(`http://reactnodejstest.xicom.us/api/v1/user/document-submit`, {
    //     body: {
    //       isPermanentCurrentAdd: false,
    //       firstName: "ckjdf",
    //       lastName: "tiwari",
    //       email: "tiwari1@gmal.com",
    //       dateOfBirth: "2004-06-28",
    //       cAddressS1: "skjdkf aksjdfk kajsdf",
    //       cAddressS2: "jkajd kajsdkf aksjdf",
    //       pAddressS1: "new delhi",
    //       pAddressS2: "New Delhi",
    //     }, //{ ...finalTemp },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //   });
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid>
        <Paper elevation={8} sx={{ p: 4, mt: 2 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              textAlign: "center",
              fontWeight: "600",
              borderBottom: "2px solid black",
            }}
          >
            User Detail Form
          </Typography>
          <Stack spacing={3}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Stack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <TextField
                  size="small"
                  sx={{ minWidth: "300px" }}
                  required
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  size="small"
                  sx={{ minWidth: "300px" }}
                  name="lastName"
                  required
                  label="Last Name"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Stack>
              <Stack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}
              >
                <TextField
                  size="small"
                  required
                  name="email"
                  sx={{ minWidth: "300px" }}
                  type="email"
                  label="Your Email"
                  variant="outlined"
                  onChange={handleChange}
                />
                {/* <InputLabel
                    id="dateTitlehere"
                    sx={{ fontSize: "12px", p: 0, ml: 1 }}
                  >
                    Date of dateOfBirth
                  </InputLabel> */}
                <TextField
                  labelid="dateTitlehere"
                  size="small"
                  required
                  name="dateOfBirth"
                  InputLabelProps={{ shrink: true }}
                  sx={{ minWidth: "300px" }}
                  type="date"
                  label={"Your DOB"}
                  variant="outlined"
                  helperText={
                    calenderError ? (
                      <span style={{ color: "red" }}> "min age 18y"</span>
                    ) : (
                      "min age 18y"
                    )
                  }
                  onChange={handleChange}
                />
              </Stack>
              <Typography sx={{ ml: 1 }}> Resident Address*</Typography>
              <Stack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <TextField
                  size="small"
                  required
                  name="cAddressS1"
                  sx={{ minWidth: "300px" }}
                  multiline
                  minRows={2}
                  label=" Resident Street 1"
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  size="small"
                  name="cAddressS2"
                  required
                  sx={{ minWidth: "300px" }}
                  multiline
                  label="Resident Street 2"
                  minRows={2}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Stack>
              <Stack spacing={2} direction="row" sx={{ ml: 1 }}>
                <FormControlLabel
                  size="small"
                  name="sameas"
                  control={<Checkbox checked={isPermanentCurrentAdd} />}
                  label="Permanent Address, Same as Resident Address*"
                  onChange={handleChange}
                />
              </Stack>
              <Typography sx={{ ml: 1 }}> Permanent Address*</Typography>
              <Stack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Box>
                  <TextField
                    required={!isPermanentCurrentAdd}
                    size="small"
                    name="pAddressS1"
                    sx={{ minWidth: "300px" }}
                    multiline
                    minRows={2}
                    value={
                      isPermanentCurrentAdd
                        ? formData.cAddressS1
                        : formData.pAddressS1
                    }
                    label={isPermanentCurrentAdd ? "" : "Permanent Street 1"}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    required={!isPermanentCurrentAdd}
                    size="small"
                    name="pAddressS2"
                    sx={{ minWidth: "300px" }}
                    multiline
                    label={isPermanentCurrentAdd ? " " : "Permanent Street 2"}
                    minRows={2}
                    variant="outlined"
                    value={
                      isPermanentCurrentAdd
                        ? formData.cAddressS2
                        : formData.pAddressS2
                    }
                    onChange={handleChange}
                  />
                </Box>
              </Stack>
              <Typography sx={{ ml: 2, mt: 2 }}> Upload Documents*</Typography>
              <Stack
                spacing={1}
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TextField
                  size="small"
                  required
                  name="docName"
                  sx={{ minWidth: "150px" }}
                  minRows={2}
                  label="File Name"
                  variant="outlined"
                  // onChange={handleFileChange}
                  onBlur={handleFileChange}
                />
                <FormControl
                  sx={
                    formData?.docType
                      ? {
                          minWidth: "150px",
                          justifyContent: "center",
                          // height: "55px",
                        }
                      : {
                          minWidth: "150px",
                          justifyContent: "center",
                          height: "55px",
                        }
                  }
                >
                  <InputLabel id="demo-simple-select-label">
                    Select File Type
                  </InputLabel>
                  <Select
                    required
                    sx={{ maxHeight: "40px" }}
                    labelid="demo-simple-select-label"
                    name="docType"
                    value={formData?.docType}
                    label="Select File Type"
                    // onChange={handleFileChange}
                    onBlur={handleFileChange}
                  >
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"pdf"}>PDF</MenuItem>
                    <MenuItem value={"image"}>IMG</MenuItem>
                  </Select>
                </FormControl>
                {/* <Box> */}
                <input
                  required
                  ref={inputRef1}
                  accept={
                    formData?.docType === "pdf" ? "application/pdf" : "image/*"
                  }
                  style={{ maxWidth: "200px" }}
                  type="file"
                  name="docFile"
                  multiple
                  onChange={handleFiles}
                />
                <IconButton onClick={() => handleClick("add")}>
                  <LibraryAddOutlinedIcon sx={{ color: "lightGreen" }} />
                </IconButton>
                {/* </Box> */}
              </Stack>
              {/* <Stack
                spacing={1}
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <TextField
                  size="small"
                  required
                  name="docName[1]"
                  sx={{ minWidth: "150px" }}
                  minRows={2}
                  label="File Name"
                  variant="outlined"
                  onChange={handleChange}
                />
                <FormControl
                  sx={
                    formData?.["docType[1]"]
                      ? {
                          minWidth: "150px",
                          justifyContent: "center",
                          // height: "55px",
                        }
                      : {
                          minWidth: "150px",
                          justifyContent: "center",
                          height: "55px",
                        }
                  }
                >
                  <InputLabel id="demo-simple-select-label">
                    Select File Type
                  </InputLabel>
                  <Select
                    required
                    sx={{
                      maxHeight: "40px",
                    }}
                    labelid="demo-simple-select-label"
                    name="docType[1]"
                    value={formData?.["docType[1]"]}
                    label="Select File Type"
                    onChange={handleChange}
                  >
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"pdf"}>PDF</MenuItem>
                    <MenuItem value={"image"}>IMG</MenuItem>
                  </Select>
                </FormControl>
                <input
                  required
                  key={resetKey}
                  ref={inputRef2}
                  type="file"
                  multiple
                  accept={
                    formData?.["docType[1]"] === "pdf"
                      ? "application/pdf"
                      : "image/*"
                  }
                  style={{ maxWidth: "200px" }}
                  name="file2"
                  onChange={handleFileChange}
                />
                <IconButton onClick={() => handleClick("delete")}>
                  <DeleteForeverOutlinedIcon sx={{ color: "red" }} />
                </IconButton>
              </Stack> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  // size="small"
                  sx={{ mt: 2, width: "150px" }}
                >
                  submit
                </Button>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserDetail;
