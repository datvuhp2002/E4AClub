"use client";
import { useState, MouseEvent, useEffect } from "react";

import { Popover, Stack } from "@mui/material";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import DT from "datatables.net-dt";
import "datatables.net-fixedcolumns-dt";
import "datatables.net-responsive-dt";
import DataTable from "datatables.net-react";

DataTable.use(DT);

interface DataTable {
  data: any;
  selectedColumn: any;
  edit_direction: any;
  action?: (id: any) => any;
  delete_handle: (id: any) => any;
}
function App({
  data,
  selectedColumn,
  edit_direction,
  action,
  delete_handle,
}: DataTable) {
  const route = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleOpenPopover = (event: MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowId);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleView = () => {
    route.push(`${edit_direction}/${selectedRow}`);
    handleClosePopover();
  };

  const handleDelete = () => {
    console.log(`Delete item with ID: ${selectedRow}`);
    delete_handle(selectedRow);
    // handleClosePopover();
  };

  const tableOptions = {
    scrollX: true,
    responsive: false,
    fixedColumns: {
      leftColumns: 0,
      rightColumns: 1,
    },
    language: {
      lengthMenu: "Hiển thị _MENU_ mục mỗi trang",
      search: "Tìm kiếm",
      info: "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
      emptyTable: "Không có dữ liệu",
      zeroRecords: "Không có dữ liệu",
    },
    columns: [
      {
        title: "#",
        data: null,
        orderable: true,
        render: (data: any, type: any, row: any, meta: any) => {
          return meta.row + 1;
        },
      },
      ...selectedColumn,
      {
        title: "",
        data: null,
        orderable: false,
        render: (data: any, type: any, row: any) => {
          return `
            <button class='action-menu bg-transparent btn ' data-id='${row._id}'>
              <svg fill="#333" width="3rem" height="2rem" viewBox="0 0 512.00 512.00" xmlns="http://www.w3.org/2000/svg" stroke="#637381" stroke-width="0.512" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>ionicons-v5-f</title>
                  <circle cx="256" cy="256" r="48"></circle>
                  <circle cx="256" cy="416" r="48"></circle>
                  <circle cx="256" cy="96" r="48"></circle>
                </g>
              </svg>
            </button>
          `;
        },
      },
    ],
    drawCallback: function () {
      document.querySelectorAll(".action-menu").forEach((element) => {
        element.addEventListener("click", (event) => {
          const id = (event.currentTarget as HTMLElement).getAttribute(
            "data-id"
          );
          handleOpenPopover(event as any, id!);
        });
      });
    },
  };
  useEffect(() => {}, [data]);
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      {typeof window !== "undefined" && (
        <DataTable
          data={data}
          options={tableOptions}
          className="display nowrap"
        />
      )}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Stack spacing={1} padding={0.4} className="bg-white">
          <div>
            <Button
              className="w-100 justify-content start "
              transparent_btn
              rounded
              edit_btn
              onClick={handleView}
              leftIcon={<FontAwesomeIcon icon={faEye} />}
            >
              Chi tiết
            </Button>
            <Button
              className="w-100 justify-content start m-0 mt-2"
              transparent_btn
              rounded
              edit_btn
              onClick={handleDelete}
              leftIcon={<FontAwesomeIcon icon={faBan} />}
            >
              Xóa
            </Button>
          </div>

          <div>
            {/* <Button
              className="w-100 "
              color="error"
              rounded
              transparent_btn
              trash_btn
              onClick={handleDelete}
              leftIcon={<FontAwesomeIcon icon={faTrashCan} />}
            >
              Xóa
            </Button> */}
          </div>
        </Stack>
      </Popover>
    </div>
  );
}

export default App;
