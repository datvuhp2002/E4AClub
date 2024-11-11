"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRotateLeft,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FormAdminApproveRegistration.module.scss";
import InputField from "@/modules/common/components/input-field-register-library";
import Button from "@/modules/common/components/Button";
import { useEffect, useState } from "react";
import RegisterLibraryServices from "@/services/register-library-services";
import Select from "@/modules/common/components/Select";
import Tooltip from "@mui/material/Tooltip";
import CustomSkeleton from "@/modules/common/components/custom-skeleton";
import { handleDateInput } from "@/modules/common/tools/date-validation";

interface FormAdminApproveRegistrationProps {
  register: any;
  errors: any;
  handleSubmit: any;
  onSubmit: any;
  getValues: any;
  setValue: any;
  clearErrors: any;
  getRegisterSearch: () => void;
}

interface IFormValue {
  cardType?: string;
  cccd?: string;
  registrationCode?: string;
}

const FormAdminApproveRegistration: React.FC<
  FormAdminApproveRegistrationProps
> = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  getValues,
  setValue,
  clearErrors,
  getRegisterSearch,
}) => {
  const [cardType, setCardType] = useState<any>([]);
  const [readers, setReaders] = useState<any>([]);
  const [status, setStatus] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [initSearchResponse, cardStatusResponse] = await Promise.all([
          RegisterLibraryServices.InitSearch(),
          RegisterLibraryServices.GetCardStatus(),
        ]);

        if (initSearchResponse.cards) {
          setIsLoading(false);
          setCardType(initSearchResponse.cards);
          setReaders(initSearchResponse.readers);
        }

        if (cardStatusResponse.cards) {
          setStatus(cardStatusResponse.cards);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const resetFormValues = () => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      setValue(key as keyof IFormValue, "");
    });
    Object.keys(currentValues).forEach((key) => {
      clearErrors(key as keyof IFormValue);
    });
    getRegisterSearch();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.form} d-flex align-items-center justify-content-center flex-column`}
    >
      <div className="mt-3 d-flex row w-100 justify-content-between">
        <div className="row col-sm-12 col-md-10 align-items-center m-0">
          {/* Card type */}
          <div className="col-xs-12 col-md-4 mb-2">
            {!isLoading ? (
              <Select
                name="cardtype"
                register={register}
                validation={{}}
                errors={errors}
                admin_temp_research
              >
                <option value="" hidden>
                  --- Loại thẻ đăng ký ---
                </option>
                {cardType &&
                  cardType.map((item: any, index: string) => (
                    <option key={index} value={item.value}>
                      {item.title}
                    </option>
                  ))}
              </Select>
            ) : (
              <CustomSkeleton variant="rounded" height="3.5rem" />
            )}
          </div>
          {/* Registration Code */}
          <div className="col-xs-12 col-md-4 mb-2">
            <InputField
              admin_temp={true}
              text_end={true}
              name="coderegister"
              register={register}
              required={false}
              placeholder="Mã đăng ký"
              errors={errors}
              admin_temp_research
            />
          </div>
          {/* fullName */}
          <div className="col-xs-12 col-md-4 mb-2">
            <InputField
              admin_temp={true}
              text_end={true}
              name="fullname"
              register={register}
              validation={{}}
              required={false}
              placeholder="Tên người đăng ký"
              errors={errors}
              admin_temp_research
            />
          </div>
          {/* Advance */}
          {/* status */}
          {isAdvancedSearch && status && (
            <div className="col-xs-12 col-md-6 mb-2">
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
                {status &&
                  status.map((item: any, index: string) => (
                    <option key={index} value={item.value}>
                      {item.title}
                    </option>
                  ))}
              </Select>
            </div>
          )}
          {/* readers */}
          {isAdvancedSearch && readers && (
            <div className="col-xs-12 col-md-6 mb-2">
              <Select
                name="readertype"
                register={register}
                validation={{}}
                errors={errors}
                admin_temp_research
              >
                <option value="" hidden>
                  --- Đã in thẻ cho bạn đọc ---
                </option>
                {readers &&
                  readers.map((item: any, index: string) => (
                    <option key={index} value={item.value}>
                      {item.title}
                    </option>
                  ))}
              </Select>
            </div>
          )}
          {/* code */}
          {isAdvancedSearch && (
            <div className="col-xs-12 col-md-6 mb-2">
              <InputField
                admin_temp={true}
                text_end={true}
                name="coderegister"
                register={register}
                validation={{}}
                required={false}
                placeholder="Số thẻ"
                errors={errors}
                admin_temp_research
              />
            </div>
          )}
          {/* Nhận thẻ */}
          {isAdvancedSearch && readers && (
            <div className="col-xs-12 col-md-6 mb-2">
              <Select
                name="received"
                register={register}
                validation={{}}
                errors={errors}
                admin_temp_research
              >
                <option value="" hidden>
                  --- Nhận thẻ ---
                </option>
                {readers &&
                  readers.map((item: any, index: string) => (
                    <option key={index} value={item.value}>
                      {item.title}
                    </option>
                  ))}
              </Select>
            </div>
          )}
          {/* Start day */}
          {isAdvancedSearch && (
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
          )}
          {/* End day */}
          {isAdvancedSearch && (
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
          )}
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
          <div className={styles.space}>
            <Tooltip title="Tra cứu nâng cao" arrow placement="top">
              <Button
                rounded
                className="fs-3"
                icon_only
                transparent_btn
                type="button"
                leftIcon={<FontAwesomeIcon icon={faSliders} />}
                onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormAdminApproveRegistration;
