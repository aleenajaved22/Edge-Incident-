import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const reportTypeOptions = ["Incident Report", "Activity Report"];
const reportTypesWithGroupAndType = new Set(["Incident Report", "Activity Report"]);
const typeOptionsByGroup = {
  Walmart: ["Trespassing", "Intruder Alarm", "Fire Alarm"],
  "Milwaukee Tools": ["Trespassing", "Intruder Alarm"],
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#146dff",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const selectSx = {
  borderRadius: "4px",
  backgroundColor: "#fff",
  "& .MuiSelect-select": {
    minHeight: "20px",
    padding: "11px 14px",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#262527",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#bfc2c7",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#aeaeb2",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#146dff",
  },
  "& .MuiSvgIcon-root": {
    color: "#5b5b5f",
  },
};

const menuPaperSx = {
  marginTop: "6px",
  border: "1px solid #e6e6e7",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(16, 24, 40, 0.08)",
};

const menuItemSx = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#262527",
  padding: "10px 14px",
};

function DropdownField({ label, value, onChange, options }) {
  return (
    <Box className="report-type-dropdown">
      <label className="field-label">{label}</label>
      <FormControl fullWidth size="small">
        <Select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputProps={{ "aria-label": label }}
          MenuProps={{
            PaperProps: { sx: menuPaperSx },
            MenuListProps: { sx: { paddingTop: 0, paddingBottom: 0 } },
          }}
          sx={selectSx}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={menuItemSx}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function EditReportDropdowns() {
  const groupOptions = useMemo(() => Object.keys(typeOptionsByGroup), []);
  const [reportType, setReportType] = useState("Incident Report");
  const [group, setGroup] = useState("Milwaukee Tools");
  const availableTypes = useMemo(() => typeOptionsByGroup[group] ?? [], [group]);
  const [type, setType] = useState((typeOptionsByGroup["Milwaukee Tools"] ?? [])[0] ?? "");
  const showDependentDropdowns = reportTypesWithGroupAndType.has(reportType);

  useEffect(() => {
    if (!availableTypes.includes(type)) {
      setType(availableTypes[0] ?? "");
    }
  }, [availableTypes, type]);

  return (
    <ThemeProvider theme={theme}>
      <DropdownField
        label="Report Type"
        value={reportType}
        onChange={setReportType}
        options={reportTypeOptions}
      />
      {showDependentDropdowns && (
        <>
          <DropdownField label="Group" value={group} onChange={setGroup} options={groupOptions} />
          <DropdownField label="Type" value={type} onChange={setType} options={availableTypes} />
        </>
      )}
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("report-dropdowns-root");

if (rootElement) {
  createRoot(rootElement).render(<EditReportDropdowns />);
}
