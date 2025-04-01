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
import { useToastContext } from "@/lib/context/toast-context";
import { useModalContext } from "@/lib/context/modal-context";

DataTable.use(DT);

interface DataTableProps {
  data: any;
  selectedColumn: any[];
  edit_direction: string;
  action?: (id: any) => any;
  delete_handle: (id: any) => Promise<{ success: boolean }>;
  show_detail?: boolean;
}
function App({
  data: initialData,
  selectedColumn,
  edit_direction,
  action,
  delete_handle,
  show_detail = true,
}: DataTableProps) {
  const route = useRouter();
  const [data, setData] = useState(initialData); // Quản lý dữ liệu bằng state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const { HandleOpenToast } = useToastContext();
  const { HandleOpenModal, HandleCloseModal } = useModalContext();
  const handleOpen = () => {
    HandleOpenModal({
      title: "Xác nhận",
      body: (
        <div className="fw-bold">
          Hành động này sẽ không thể khôi phục, bạn chắc chắn muốn tiếp tục?
        </div>
      ),
      footer: (
        <div className="d-flex">
          <Button danger_btn rounded onClick={() => handleDelete()}>
            Xác nhận
          </Button>
          <Button
            edit_btn
            rounded
            onClick={() => {
              HandleCloseModal();
            }}
          >
            Hủy
          </Button>
        </div>
      ),
    });
  };

  const handleSuccessToast = (message: string) => {
    HandleOpenToast({
      type: "success",
      content: message,
    });
  };
  const handleErrorToast = (message: string) => {
    HandleOpenToast({
      type: "error",
      content: `${message}! Vui lòng thử lại`,
    });
  };

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

  const handleDelete = async () => {
    try {
      const result = await delete_handle(selectedRow);
      if (result && result.success) {
        setData((prevData: any) =>
          prevData.filter((row: any) => row._id !== selectedRow)
        ); // Loại bỏ dòng đã xóa
        handleSuccessToast("Xóa thành công");
      } else {
        handleErrorToast("Xóa thất bại");
      }
    } catch (e) {
      console.error(e);
      handleErrorToast("Xóa thất bại");
    } finally {
      handleClosePopover();
      HandleCloseModal();
    }
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
            {show_detail === true && (
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
            )}
            <Button
              className="w-100 justify-content start m-0 mt-2"
              transparent_btn
              rounded
              edit_btn
              onClick={handleOpen}
              leftIcon={<FontAwesomeIcon icon={faBan} />}
            >
              Xóa
            </Button>
          </div>
        </Stack>
      </Popover>
    </div>
  );
}

export default App;
