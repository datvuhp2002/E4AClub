const WebMetadata = (tenant: any) => {
  var title = "Thư viện local",
    description = "";
  if (tenant == "py") {
    title = "Thư viện tỉnh";
    description = "";
  } else if (tenant == "ftu") {
    title = "Thư viện trường";
    description = "";
  } else if (tenant == "nlv") {
    title = "Thư viện quốc gia";
    description = "";
  } else if (tenant == "sl") {
    title = "Thư viện tỉnh";
    description = "";
  } else if (tenant == "dev") {
    title = "Thư viện dev";
    description = "";
  }
  return {
    title: title,
    description: description,
  };
};
const PageSize = 10;

const PageSize_Search = 10;

const Tctl_SelectionGroup = [
  {
    value: "typedoc",
    label: "Loại tài liệu",
    data: [
      {
        value: "1",
        label: "Loại tài liệu 1",
        count: 10,
      },
      {
        value: "2",
        label: "Loại tài liệu 2",
        count: 10,
      },
      {
        value: "3",
        label: "Loại tài liệu 3",
        count: 10,
      },
    ],
  },
  {
    value: "author",
    label: "Tác giả",
    data: [
      {
        value: "1",
        label: "Tác giả 1",
        count: 10,
      },
      {
        value: "2",
        label: "Tác giả 2",
        count: 10,
      },
      {
        value: "3",
        label: "Tác giả 3",
        count: 10,
      },
    ],
  },
  {
    value: "keyword",
    label: "Từ khóa",
    data: [
      {
        value: "1",
        label: "Từ khóa 1",
        count: 10,
      },
      {
        value: "2",
        label: "Từ khóa 2",
        count: 10,
      },
      {
        value: "3",
        label: "Từ khóa 3",
        count: 10,
      },
    ],
  },
  {
    value: "subject",
    label: "Chủ đề",
    data: [
      {
        value: "1",
        label: "Chủ đề 1",
        count: 10,
      },
      {
        value: "2",
        label: "Chủ đề 2",
        count: 10,
      },
      {
        value: "3",
        label: "Chủ đề 3",
        count: 10,
      },
    ],
  },
];

const Bst_SelectionGroup = [
  {
    value: "collection",
    label: "Bộ sưu tập",
    data: [
      {
        value: "1",
        label: "Bộ sưu tập 1",
        count: 10,
      },
      {
        value: "2",
        label: "Bộ sưu tập 2",
        count: 10,
      },
      {
        value: "3",
        label: "Bộ sưu tập 3",
        count: 10,
      },
    ],
  },
  {
    value: "yearpub",
    label: "Năm xuất bản",
    data: [
      {
        value: "1",
        label: "Năm xuất bản 1",
        count: 10,
      },
      {
        value: "2",
        label: "Năm xuất bản 2",
        count: 10,
      },
      {
        value: "3",
        label: "Năm xuất bản 3",
        count: 10,
      },
    ],
  },
  {
    value: "subject",
    label: "Chủ đề",
    data: [
      {
        value: "1",
        label: "Chủ đề 1",
        count: 10,
      },
      {
        value: "2",
        label: "Chủ đề 2",
        count: 10,
      },
      {
        value: "3",
        label: "Chủ đề 3",
        count: 10,
      },
    ],
  },
];

const SortDocBy = [
  { value: "namxuatbangiam", label: "Sắp xếp : Năm xuất bản giảm dần" },
  { value: "namxuatbantang", label: "Sắp xếp : Năm xuất bản tăng dần" },
];

const SearchType = {
  Quick: "quick",
  Advance: "advance",
};

const FilterBy = [
  { key: "Bib_Type", cLabel: "loai-tai-lieu", value: "bib_type" },
  { key: "Author", cLabel: "tac-gia", value: "author" },
  { key: "Subject", cLabel: "chu-de", value: "subject" },
  { key: "Keyword", cLabel: "tu-khoa", value: "keyword" },
  { key: "PubYear", cLabel: "nam-xuat-ban", value: "pubyear" },
];

const SearchDocBy = [
  { value: "title", cLabel: "nhan-de", label: "Nhan đề" },
  { value: "bib_type", cLabel: "loai-tai-lieu", label: "Loại tài liệu" },
  { value: "author", cLabel: "tac-gia", label: "Tác giả" },
  { value: "subject", cLabel: "chu-de", label: "Chủ đề" },
  { value: "keyword", cLabel: "tu-khoa", label: "Từ khóa" },
  { value: "yearpub", cLabel: "nam-xuat-ban", label: "Năm xuất bản" },
];
const HomeSearchDocBy = [
  { value: "all", cLabel: "toan-van", label: "Tìm nhanh" },
  ...SearchDocBy,
];

const QuickSearchDocBy = [
  { value: "all", cLabel: "toan-van", label: "Tìm tất cả" },
  ...SearchDocBy,
];

const ResourceDoc = [
  { value: "adoc", label: "Tất cả tài nguyên" },
  { value: "ddoc", label: "Tài liệu điện tử" },
  { value: "pdoc", label: "Tài liệu in" },
];

const OperatorQuery = [
  { value: "And", label: "and" },
  { value: "Or", label: "or" },
  { value: "Not", label: "not" },
];
const DefaultFilterCollection = [
  { code: "bib_type", value: [] },
  { code: "author", value: [] },
  { code: "keyword", value: [] },
  { code: "pubyear", value: [] },
  { code: "subject", value: [] },
];
const DefaultCollection = [
  { code: "pdoc", value: [] },
  { code: "ddoc", value: [] },
];
const menuOptionAdmin = [
  { title: "Cài đặt", path: "/admin/setting" },
  { title: "Đăng xuất", path: "/login" },
];
export {
  WebMetadata,
  DefaultFilterCollection,
  DefaultCollection,
  FilterBy,
  SearchDocBy,
  Tctl_SelectionGroup,
  Bst_SelectionGroup,
  PageSize,
  PageSize_Search,
  SearchType,
  HomeSearchDocBy,
  QuickSearchDocBy,
  ResourceDoc,
  OperatorQuery,
  SortDocBy,
  menuOptionAdmin,
};
