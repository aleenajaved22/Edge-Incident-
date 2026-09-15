import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const answerTypeOptions = [
  "Text",
  "Phone Number",
  "Description Box",
  "Number",
  "Multiple Selection",
  "Date & Time",
  "Radio Buttons (Single Selection)",
  "Date",
  "Time",
  "Image",
  "Attachment",
  "Signature",
];

const reportTypeOptions = ["Tour Report", "Incident Report"];

// Mirrors groups defined in the Settings > Groups tab.
const groupOptions = ["Walmart", "Mega Saver"];

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
  maxHeight: 280,
};

const menuItemSx = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#262527",
  padding: "10px 14px",
};

let nextFieldId = 1;

function DropdownField({ label, value, onChange, options, required = false }) {
  return (
    <Box className="report-type-dropdown">
      <label className={`field-label${required ? " required" : ""}`}>{label}</label>
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

function IncidentEnableCheckbox({ enabled, onChange }) {
  return (
    <label className="rule-checkbox-row mui-checkbox-row incident-enable-row">
      <input
        type="checkbox"
        className="mui-checkbox-input"
        checked={enabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="mui-checkbox-box"></span>
      <span className="incident-enable-copy">
        <span className="incident-enable-title">Incident Report</span>
        <span className="incident-enable-subtitle">
          Enable to include incident report in this report
        </span>
      </span>
    </label>
  );
}

function ReportTypeField() {
  const [reportType, setReportType] = useState(reportTypeOptions[0]);
  const [group, setGroup] = useState(groupOptions[0] ?? "");
  const [enabled, setEnabled] = useState(true);
  const [fields, setFields] = useState([{ id: nextFieldId++, answerType: "Text" }]);
  const isIncidentReport = reportType === "Incident Report";

  function updateField(id, answerType) {
    setFields((current) =>
      current.map((field) => (field.id === id ? { ...field, answerType } : field)),
    );
  }

  function addField() {
    setFields((current) => [...current, { id: nextFieldId++, answerType: "Text" }]);
  }

  function removeField(id) {
    setFields((current) => (current.length <= 1 ? current : current.filter((field) => field.id !== id)));
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={isIncidentReport ? "report-dropdowns-row report-type-incident-row" : undefined}>
        <DropdownField
          label="Report Type"
          value={reportType}
          onChange={setReportType}
          options={reportTypeOptions}
          required
        />
        {isIncidentReport && (
          <DropdownField
            label="Group"
            value={group}
            onChange={setGroup}
            options={groupOptions}
            required
          />
        )}
      </div>

      {!isIncidentReport && (
        <div className="incident-answer-fields">
          <IncidentEnableCheckbox enabled={enabled} onChange={setEnabled} />
          {enabled && (
            <>
              <DropdownField
                label="Group"
                value={group}
                onChange={setGroup}
                options={groupOptions}
                required
              />
              {fields.map((field) => (
                <div key={field.id} className="incident-answer-field-row">
                  <DropdownField
                    label="Answer Type"
                    value={field.answerType}
                    onChange={(value) => updateField(field.id, value)}
                    options={answerTypeOptions}
                    required
                  />
                  {fields.length > 1 && (
                    <button
                      className="icon-btn danger incident-remove-field-btn"
                      type="button"
                      aria-label="Remove answer type"
                      onClick={() => removeField(field.id)}
                    >
                      <span className="mui-icon">delete</span>
                    </button>
                  )}
                </div>
              ))}
              <button className="btn btn-ghost incident-add-more-btn" type="button" onClick={addField}>
                <span className="mui-icon">add</span> Add more
              </button>
            </>
          )}
        </div>
      )}
    </ThemeProvider>
  );
}

const reportTypeRoot = document.getElementById("report-type-root");
if (reportTypeRoot) {
  createRoot(reportTypeRoot).render(<ReportTypeField />);
}
