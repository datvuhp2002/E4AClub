import { countries } from "@/common/static_variable";
import InputField from "@/modules/common/components/input-field-register-library";
import RadioField from "@/modules/common/components/radio-gender-field-register-library";
import SelectField from "@/modules/common/components/select-field-register-library ";
import TextareaField from "@/modules/common/components/textarea-field-register-library/TextareaField";
import {
  handleDateInput,
  validateDate,
} from "@/modules/common/tools/date-validation";
import {
  faBriefcase,
  faCalendarDays,
  faCircleInfo,
  faEarth,
  faEnvelope,
  faHouseLaptop,
  faIdCard,
  faKey,
  faMapLocationDot,
  faMobileRetro,
  faSchool,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const renderFullName = (register: any, errors: any, required = true) => (
  <InputField
    label="Họ và tên"
    name="fullName"
    register={register}
    validation={{
      required: "Họ và tên là bắt buộc",
      validate: {
        twoWords: (value: string) =>
          value.trim().split(" ").length >= 2 ||
          "Họ và tên phải có ít nhất 2 từ",
      },
      maxLength: {
        value: 254,
        message: "Họ và tên có tối đa 254 ký tự",
      },
    }}
    onInput={(e) => {
      e.target.value = e.target.value
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    }}
    placeholder="Họ và tên"
    leftIcon={<FontAwesomeIcon icon={faUser} />}
    errors={errors}
  />
);
export const renderRepresentative = (
  register: any,
  errors: any,
  required = true
) => (
  <InputField
    label="Họ và tên người giám hộ"
    name="representative"
    register={register}
    validation={{
      required: "Họ và tên người giám hộ là bắt buộc",
      validate: {
        twoWords: (value: string) =>
          value.trim().split(" ").length >= 2 ||
          "Họ và tên người giám hộ phải có ít nhất 2 từ",
      },
      maxLength: {
        value: 254,
        message: "Họ và tên có tối đa 254 ký tự",
      },
    }}
    placeholder="Họ và tên người giám hộ"
    leftIcon={<FontAwesomeIcon icon={faUser} />}
    errors={errors}
    onInput={(e) => {
      e.target.value = e.target.value
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    }}
  />
);
export const renderGender = (register: any, errors: any, required = true) => (
  <RadioField label="Giới tính" register={register} errors={errors} />
);
export const renderDob = (register: any, errors: any, required = true) => (
  <InputField
    label="Ngày sinh"
    name="dob"
    register={register}
    validation={{
      required: "Ngày sinh không để trống",
      validate: validateDate,
    }}
    placeholder="Ngày/Tháng/Năm"
    leftIcon={<FontAwesomeIcon icon={faCalendarDays} />}
    errors={errors}
    onInput={handleDateInput}
  />
);
export const renderCMND = (register: any, errors: any, required = true) => (
  <InputField
    label="CMND/CCCD"
    name="cccd"
    register={register}
    validation={{
      required: required ? "Căn cước công dân không để trống" : "",
      length: {
        value: 12,
        message: "Căn cước công dân phải có 12 ký tự",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "Chỉ cho phép số, không có chữ cái",
      },
      maxLength: {
        value: 12,
        message: "Căn cước có tối đa 12 ký tự",
      },
    }}
    required={required}
    leftIcon={<FontAwesomeIcon icon={faIdCard} />}
    placeholder="CMND/CCCD"
    errors={errors}
    onInput={(e) => {
      const inputValue = e.target.value.replace(/[^0-9]/g, "");
      e.target.value = inputValue;
    }}
  />
);
export const renderAddress = (register: any, errors: any, required = true) => (
  <InputField
    label="Địa chỉ"
    name="address"
    register={register}
    validation={{
      required: required ? "Địa chỉ không để trống" : "",
      maxLength: {
        value: 254,
        message: "Địa chỉ có tối đa 254 ký tự",
      },
    }}
    leftIcon={<FontAwesomeIcon icon={faMapLocationDot} />}
    placeholder="Địa chỉ"
    required={required}
    errors={errors}
  />
);
export const renderEmail = (register: any, errors: any, required = true) => (
  <InputField
    label="Email"
    name="email"
    register={register}
    validation={{
      required: required ? "Email không để trống" : "",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Email không hợp lệ",
      },
      maxLength: {
        value: 254,
        message: "Email có tối đa 254 ký tự",
      },
    }}
    placeholder="Nhập email"
    required={required}
    leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
    errors={errors}
  />
);
export const renderPhone = (register: any, errors: any, required = true) => (
  <InputField
    label="Điện thoại"
    name="tel"
    register={register}
    validation={{
      required: "Số điện thoại không để trống",
      pattern: {
        value: /^[0-9]+$/,
        message: "Chỉ cho phép số, không có chữ cái",
      },
      maxLength: {
        value: 12,
        message: "Số điện thoại có tối đa 12 ký tự",
      },
    }}
    leftIcon={<FontAwesomeIcon icon={faMobileRetro} />}
    placeholder="Điện thoại"
    errors={errors}
    onInput={(e) => {
      const inputValue = e.target.value.replace(/[^0-9]/g, "");
      e.target.value = inputValue;
    }}
  />
);
export const renderJob = (
  register: any,
  errors: any,
  required = true,
  job: any
) => (
  <SelectField
    label="Nghề nghiệp"
    name="job"
    leftIcon={<FontAwesomeIcon icon={faBriefcase} />}
    validation={{
      required: "Nghề nghiệp là bắt buộc",
    }}
    register={register}
    data={job}
    errors={errors}
  />
);
export const renderWorkplace = (
  register: any,
  errors: any,
  required = true,
  label = "Nơi làm việc"
) => (
  <InputField
    label={label}
    name="office"
    register={register}
    validation={{
      required: `${label} không để trống`,
      maxLength: {
        value: 254,
        message: `${label} có tối đa 254 ký tự`,
      },
    }}
    leftIcon={<FontAwesomeIcon icon={faHouseLaptop} />}
    placeholder={label}
    errors={errors}
  />
);
export const renderNation = (register: any, errors: any, required = true) => (
  <SelectField
    label="Quốc tịch"
    name="nation"
    leftIcon={<FontAwesomeIcon icon={faEarth} />}
    validation={{ required: "Quốc tịch là bắt buộc" }}
    register={register}
    data={countries}
    errors={errors}
    default_value={countries[0]}
  />
);
export const renderSchool = (register: any, errors: any, required = true) => (
  <InputField
    label="Trường học"
    name="office"
    register={register}
    validation={{
      required: required ? "Trường học không được để trống" : "",
      maxLength: {
        value: 254,
        message: "Trường học có tối đa 254 ký tự",
      },
    }}
    leftIcon={<FontAwesomeIcon icon={faSchool} />}
    required={required}
    placeholder="Trường học"
    errors={errors}
  />
);
export const renderLevel = (
  register: any,
  errors: any,
  required = true,
  educationLevel: any
) => (
  <SelectField
    label="Trình độ học vấn"
    name="level"
    leftIcon={<FontAwesomeIcon icon={faEarth} />}
    validation={{
      required: "Trình độ học vấn là bắt buộc",
    }}
    register={register}
    data={educationLevel}
    errors={errors}
  />
);
export const renderKey = (register: any, errors: any, required = true) => (
  <InputField
    label="Mã đăng ký"
    name="coderegister"
    register={register}
    validation={{
      required: "Mã đăng ký là bắt buộc",
    }}
    placeholder="Mã đăng ký"
    leftIcon={<FontAwesomeIcon icon={faKey} />}
    errors={errors}
  />
);
export const renderTitle = (register: any, errors: any, required = true) => (
  <InputField
    label="Tiêu đề"
    name="title"
    register={register}
    validation={{
      required: "Tiêu đề không để trống",
      maxLength: {
        value: 254,
        message: "Tiêu đề có tối đa 254 ký tự",
      },
    }}
    leftIcon={<FontAwesomeIcon icon={faCircleInfo} />}
    placeholder="Tiêu đề"
    errors={errors}
  />
);
export const renderContent = (register: any, errors: any, required = true) => (
  <TextareaField
    label="Góp ý"
    name="content"
    register={register}
    validation={{
      required: "Góp ý không để trống",
    }}
    placeholder="Nội dung"
    errors={errors}
  />
);
