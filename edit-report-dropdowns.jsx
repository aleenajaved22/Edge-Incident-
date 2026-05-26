import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Box, Checkbox, FormControl, MenuItem, Select } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const reportTypeOptions = ["Incident Report", "Activity Report"];
const reportTypesWithGroup = new Set(["Incident Report", "Activity Report"]);

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

const checkboxSx = {
  marginLeft: "16px",
  padding: 0,
  color: "#aeaeb2",
  flexShrink: 0,
  "&.Mui-checked": {
    color: "#146dff",
  },
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

function ToggleField({ label, description, checked, onChange }) {
  return (
    <Box className="report-setting-card">
      <div className="report-setting-copy">
        <span className="field-label report-setting-label">{label}</span>
        <p className="report-setting-description">{description}</p>
      </div>
      <Checkbox
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        inputProps={{ "aria-label": label }}
        sx={checkboxSx}
      />
    </Box>
  );
}

function EditReportDropdowns() {
  const [reportType, setReportType] = useState("Incident Report");
  const [groupEnabled, setGroupEnabled] = useState(true);
  const showDependentDropdowns = reportTypesWithGroup.has(reportType);

  return (
    <ThemeProvider theme={theme}>
      <DropdownField
        label="Report Type"
        value={reportType}
        onChange={setReportType}
        options={reportTypeOptions}
      />
      {showDependentDropdowns && (
        <ToggleField
          label="Group"
          description="Enable group-based reporting for this template"
          checked={groupEnabled}
          onChange={setGroupEnabled}
        />
      )}
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("report-dropdowns-root");

if (rootElement) {
  createRoot(rootElement).render(<EditReportDropdowns />);
}
