import {
  Box,
  Menu,
  Table,
  Button,
  Tooltip,
  TableRow,
  MenuItem,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  IconButton,
  TableSortLabel,
  TableContainer,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import {
  LastPage,
  FirstPage,
  FilterList,
  ArrowDropDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useIntl } from "react-intl";
import React, { useState, useEffect } from "react";

import { ButtonComp } from "../Button";
import { TableCompWrapper } from "./TableCompWrapper";

type Column = {
  id: string;
  label: string;
  minWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  align?: "right" | "left" | "center";
  format?: (value: any) => string | React.ReactNode;
};

type ActionButton<T> = {
  label: string;
  color?:
    | "info"
    | "error"
    | "inherit"
    | "primary"
    | "success"
    | "warning"
    | "secondary";
  tooltip?: string;
  icon?: React.ReactNode;
  onClick: (selectedRows: T[]) => void;
  hidden?: (selectedRows: T[]) => boolean;
  disabled?: (selectedRows: T[]) => boolean;
};

type CustomTableProps<T> = {
  data: T[];
  columns: Column[];
  loading?: boolean;
  selectable?: boolean;
  rowIdentifier?: string;
  translateLabel?: boolean;
  showSerialNumber?: boolean;
  defaultSortColumn?: string;
  filterPlaceholder?: string;
  actions?: ActionButton<T>[];
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowClick?: (row: T) => void;
  defaultSortDirection?: "asc" | "desc";
};

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
};

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        disabled={page === 0}
        aria-label="first page"
        onClick={handleFirstPageButtonClick}
      >
        {<FirstPage />}
      </IconButton>
      <IconButton
        disabled={page === 0}
        aria-label="previous page"
        onClick={handleBackButtonClick}
      >
        {<KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        aria-label="next page"
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {<KeyboardArrowRight />}
      </IconButton>
      <IconButton
        aria-label="last page"
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {<LastPage />}
      </IconButton>
    </Box>
  );
}

function CustomTable<T>({
  data,
  columns,
  onRowClick,
  actions = [],
  loading = false,
  selectable = false,
  rowIdentifier = "id",
  translateLabel = true,
  defaultRowsPerPage = 10,
  showSerialNumber = false,
  defaultSortDirection = "asc",
  // filterPlaceholder = "Filter...",
  rowsPerPageOptions = [5, 10, 25],
  defaultSortColumn = columns[0]?.id,
}: CustomTableProps<T>) {
  const intl = useIntl();

  // State for sorting
  const [order, setOrder] = useState<"asc" | "desc">(defaultSortDirection);
  const [orderBy, setOrderBy] = useState<string>(defaultSortColumn);

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // State for filtering
  const [filterText] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  // State for selection
  const [selected, setSelected] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // State for action menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [actionRow, setActionRow] = useState<T | null>(null);

  // Reset page when filters or data changes
  useEffect(() => {
    setPage(0);
  }, [filterText, filters, data]);

  // Reset selection when data changes
  useEffect(() => {
    setSelected([]);
    setSelectAll(false);
  }, [data]);

  // Handle sort request
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle change page
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle filter text change
  //   const handleFilterTextChange = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setFilterText(event.target.value);
  //   };

  // Handle column filter change
  const handleColumnFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  // Handle select all click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelections = filteredData.map((row) =>
        (row as any)[rowIdentifier].toString()
      );
      setSelected(newSelections);
      setSelectAll(true);
      return;
    }
    setSelected([]);
    setSelectAll(false);
  };

  // Handle row selection
  const handleSelectRow = (
    _: React.ChangeEvent<HTMLInputElement>,
    rowId: string
  ) => {
    let newSelected: string[] = [];
    const selectedIndex = selected.indexOf(rowId);

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    setSelectAll(newSelected.length === filteredData.length);
  };

  // Check if a row is selected
  const isSelected = (rowId: string) => selected.indexOf(rowId) !== -1;

  // Apply sorting
  const sortedData = [...data].sort((a, b) => {
    let aValue = (a as any)[orderBy];
    let bValue = (b as any)[orderBy];

    // Handle nested properties if needed
    if (orderBy.includes(".")) {
      const properties = orderBy.split(".");
      aValue = properties.reduce((obj, prop) => obj?.[prop], a);
      bValue = properties.reduce((obj, prop) => obj?.[prop], b);
    }

    if (aValue === bValue) return 0;
    if (aValue == null) return order === "asc" ? 1 : -1;
    if (bValue == null) return order === "asc" ? -1 : 1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return order === "asc"
      ? aValue < bValue
        ? -1
        : 1
      : aValue > bValue
      ? -1
      : 1;
  });

  // Apply filtering
  const filteredData = sortedData.filter((row) => {
    // Global filter
    if (filterText) {
      const matches = columns.some((column) => {
        const value = (row as any)[column.id];
        return String(value).toLowerCase().includes(filterText.toLowerCase());
      });
      if (!matches) return false;
    }

    // Column filters
    for (const columnId in filters) {
      if (filters[columnId]) {
        const column = columns.find((col) => col.id === columnId);
        if (column) {
          const value = (row as any)[columnId];
          if (
            !String(value)
              .toLowerCase()
              .includes(filters[columnId].toLowerCase())
          ) {
            return false;
          }
        }
      }
    }

    return true;
  });

  // Paginate data
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  //   // Empty rows for empty table
  //   const emptyRows =
  //     rowsPerPage -
  //     Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  // Handle action menu open
  // const handleActionMenuOpen = (
  //   event: React.MouseEvent<HTMLElement>,
  //   row: T
  // ) => {
  //   setAnchorEl(event.currentTarget);
  //   setActionRow(row);
  // };

  // Handle action menu close
  const handleActionMenuClose = () => {
    setAnchorEl(null);
    setActionRow(null);
  };

  // Get selected rows data
  const getSelectedRows = () => {
    return data.filter((row) =>
      selected.includes((row as any)[rowIdentifier].toString())
    );
  };

  return (
    <TableCompWrapper className="table-comp-w">
      {/* Top bar with search and action buttons */}
      {selected.length > 0 && (
        <div className="table-comp-w-selected_actions">
          <div></div>
          <div className="table-comp-w-selected_actions-items">
            {actions.map((action, index) => {
              const selectedRows = getSelectedRows();
              const isDisabled = action.disabled?.(selectedRows) || false;
              const isHidden = action.hidden?.(selectedRows) || false;

              if (isHidden) return null;
              if (
                action.label === "transaction_history" ||
                action.label === "view"
              )
                return null;

              return (
                <Tooltip
                  key={index}
                  title={intl.formatMessage({ id: action.label }) || ""}
                >
                  <span>
                    <Button
                      size="small"
                      variant="contained"
                      disabled={isDisabled}
                      color={action.color || "primary"}
                      onClick={() => action.onClick(selectedRows)}
                    >
                      {action.icon}
                    </Button>
                  </span>
                </Tooltip>
              );
            })}
          </div>
        </div>
      )}

      <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="table-comp-w-table_head">
            <TableRow className="table-comp-w-table_head-row">
              {/* Selection checkbox column */}
              {selectable && (
                <TableCell
                  padding="checkbox"
                  className="table-comp-w-table_head-row-cell"
                >
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < filteredData.length
                    }
                    checked={selectAll}
                    onChange={handleSelectAllClick}
                    slotProps={{ input: { "aria-label": "select all rows" } }}
                  />
                </TableCell>
              )}

              {showSerialNumber && (
                <TableCell className="table-comp-w-table_head-row-cell">
                  {intl.formatMessage({ id: "sn" })}
                </TableCell>
              )}

              {/* Data columns */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="table-comp-w-table_head-row-cell"
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      IconComponent={ArrowDropDown}
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {translateLabel
                        ? intl.formatMessage({ id: column.label })
                        : column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                  {column.filterable && (
                    <Box mt={1}>
                      <TextField
                        size="small"
                        variant="standard"
                        placeholder={`Filter ${
                          translateLabel
                            ? intl.formatMessage({ id: column.label })
                            : column.label
                        }`}
                        value={filters[column.id] || ""}
                        onChange={(e) =>
                          handleColumnFilterChange(column.id, e.target.value)
                        }
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <FilterList fontSize="small" />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  )}
                </TableCell>
              ))}

              {/* Actions column */}
              {actions.length > 0 && (
                <TableCell
                  align="right"
                  style={{ minWidth: 100 }}
                  className="table-comp-w-table_head-row-cell"
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody className="table-comp-w-table_body">
            {loading ? (
              <TableRow className="table-comp-w-table_body-row">
                <TableCell
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (actions.length > 0 ? 1 : 0)
                  }
                  align="center"
                  className="table-comp-w-table_body-row-cell"
                >
                  <Typography>Loading...</Typography>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow className="table-comp-w-table_body-row">
                <TableCell
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (actions.length > 0 ? 1 : 0)
                  }
                  align="center"
                  className="table-comp-w-table_body-row-cell"
                >
                  <Typography>No data available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const rowId = (row as any)[rowIdentifier]?.toString();
                const isItemSelected = isSelected(rowId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    key={index}
                    onClick={(event) => {
                      // Don't trigger row click if clicking on checkbox or actions
                      if (
                        !(event.target as HTMLElement).closest(
                          'input[type="checkbox"]'
                        ) &&
                        !(event.target as HTMLElement).closest(
                          ".MuiButton-root"
                        ) &&
                        !(event.target as HTMLElement).closest(
                          ".MuiIconButton-root"
                        )
                      ) {
                        onRowClick?.(row);
                      }
                    }}
                    style={{ cursor: onRowClick ? "pointer" : "default" }}
                    role={selectable ? "checkbox" : undefined}
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    className="table-comp-w-table_body-row"
                  >
                    {/* Selection checkbox */}
                    {selectable && (
                      <TableCell
                        padding="checkbox"
                        className="table-comp-w-table_body-row-cell"
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => handleSelectRow(event, rowId)}
                          slotProps={{
                            input: { "aria-labelledby": labelId },
                          }}
                        />
                      </TableCell>
                    )}

                    {showSerialNumber && (
                      <TableCell className="table-comp-w-table_body-row-cell">
                        {index + 1}
                      </TableCell>
                    )}

                    {/* Data cells */}
                    {columns.map((column) => {
                      let value = (row as any)[column.id];

                      // Handle nested properties if needed
                      if (column.id.includes(".")) {
                        const properties = column.id.split(".");
                        value = properties.reduce(
                          (obj, prop) => obj?.[prop],
                          row
                        );
                      }

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="table-comp-w-table_body-row-cell"
                        >
                          {column.format ? column.format(row) : value}
                        </TableCell>
                      );
                    })}

                    {/* Action buttons */}
                    {actions.length > 0 && (
                      <TableCell
                        align="right"
                        className="table-comp-w-table_body-row-cell"
                      >
                        {/* <IconButton
                          aria-label="actions"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleActionMenuOpen(event, row);
                          }}
                        >
                          <MoreVert />
                        </IconButton> */}

                        {actions.map((item, index) => (
                          <Tooltip
                            key={index}
                            title={intl.formatMessage({ id: item.label })}
                            arrow
                          >
                            <ButtonComp
                              size="small"
                              disableElevation
                              variant="contained"
                              color={item.color}
                              onClick={() => item.onClick([row])}
                            >
                              {item.icon}
                            </ButtonComp>
                          </Tooltip>
                        ))}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
            {/* {emptyRows > 0 && !loading && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (actions.length > 0 ? 1 : 0)
                  }
                />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionMenuClose}
        onClick={(event) => event.stopPropagation()}
      >
        {actionRow &&
          actions.map((action, index) => {
            const isDisabled = action.disabled?.([actionRow]) || false;
            const isHidden = action.hidden?.([actionRow]) || false;

            if (isHidden) return null;

            return (
              <MenuItem
                key={index}
                onClick={() => {
                  action.onClick([actionRow]);
                  handleActionMenuClose();
                }}
                disabled={isDisabled}
              >
                {action.icon && (
                  <Box component="span" sx={{ mr: 1 }}>
                    {action.icon}
                  </Box>
                )}
                {action.label}
              </MenuItem>
            );
          })}
      </Menu>
      <TablePagination
        page={page}
        component={"div"}
        // colSpan={3}
        rowsPerPage={rowsPerPage}
        count={filteredData.length}
        slotProps={{
          select: {
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          },
        }}
        onPageChange={handleChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
        ActionsComponent={TablePaginationActions}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableCompWrapper>
  );
}

export default CustomTable;
