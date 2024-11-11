import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FormAdminComment.module.scss";
import InputField from "@/modules/common/components/input-field-register-library";
import Button from "@/modules/common/components/Button";
import { handleDateInput } from "@/modules/common/tools/date-validation";
import Select from "@/modules/common/components/Select";
import { FormAdminCommentProps, IFormAdminCommentValue } from "@/common/models";

const FormAdminComment: React.FC<FormAdminCommentProps> = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  getValues,
  setValue,
  clearErrors,
  getData,
}) => {
  const resetFormValues = () => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      setValue(key as keyof IFormAdminCommentValue, "");
    });
    Object.keys(currentValues).forEach((key) => {
      clearErrors(key as keyof IFormAdminCommentValue);
    });
    getData();
  };
  const status = [
    { value: "Tạo mới", title: "Tạo mới" },
    { value: "Đã duyệt", title: "Đã duyệt" },
  ];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.form} d-flex align-items-center justify-content-center`}
    >
      <div className="mt-3 d-flex row w-100 justify-content-between">
        <div className="row col-sm-12 col-md-10 align-items-center m-0">
          <div className="col-12 row">
            {/* status */}
            <div className="col-12 mb-2">
              <Select
                name="status"
                register={register}
                validation={{}}
                errors={errors}
                admin_temp_research
              >
                <option value="" hidden>
                  --- Trạng thái ---
                </option>
                {status.map((item: any, index: number) => (
                  <option key={index} value={item.value}>
                    {item.title}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          {/* date */}
          <div className="col-12 row">
            {/* Start day */}
            <div className="col-xs-12 col-md-6 mb-2">
              <InputField
                name="createddate_from"
                register={register}
                validation={{}}
                placeholder="Ngày bắt đầu"
                errors={errors}
                onInput={handleDateInput}
                admin_temp_research
              />
            </div>
            {/* End day */}
            <div className="col-xs-12 col-md-6 mb-2">
              <InputField
                name="createddate_to"
                register={register}
                validation={{}}
                placeholder="Ngày kết thúc"
                errors={errors}
                onInput={handleDateInput}
                admin_temp_research
              />
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-2 d-flex align-items-center justify-content-center">
          <div className={styles.space}>
            <Button
              rounded
              icon_only
              orange_btn
              type="submit"
              leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            />
          </div>
          <div className={styles.space}>
            <Button
              rounded
              icon_only
              grey_btn
              onClick={resetFormValues}
              type="button"
              leftIcon={<FontAwesomeIcon icon={faArrowRotateLeft} />}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormAdminComment;
