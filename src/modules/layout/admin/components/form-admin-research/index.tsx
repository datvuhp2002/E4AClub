"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRotateLeft,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FormAdminResearch.module.scss";
import InputField from "@/modules/common/components/input-field-register-library";
import Button from "@/modules/common/components/Button";
import { Tooltip } from "@mui/material";
import { handleDateInput } from "@/modules/common/tools/date-validation";
import { useEffect, useState } from "react";
import RegisterLibraryServices from "@/services/register-library-services";
import Select from "@/modules/common/components/Select";
import {
  FormAdminResearchProps,
  IFormAdminResearchValue,
} from "@/common/models";
import CustomSkeleton from "@/modules/common/components/custom-skeleton";

const FormAdminResearch: React.FC<FormAdminResearchProps> = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  getValues,
  setValue,
  clearErrors,
  getData,
}) => {
  const [cardType, setCardType] = useState<any>([]);
  const [readerType, setReaderType] = useState<any>([]);
  const [status, setStatus] = useState<any>([]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [initSearchResponse, cardStatusResponse] = await Promise.all([
          RegisterLibraryServices.InitSearch(),
          RegisterLibraryServices.GetCardStatus(),
        ]);

        if (initSearchResponse.cards) {
          setCardType(initSearchResponse.cards);
          setReaderType(initSearchResponse.readers);
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
      setValue(key as keyof IFormAdminResearchValue, "");
    });
    Object.keys(currentValues).forEach((key) => {
      clearErrors(key as keyof IFormAdminResearchValue);
    });
    getData();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.form} d-flex align-items-center justify-content-center`}
    >
      <div className="mt-3 d-flex row w-100 justify-content-between">
        <div className="row col-sm-12 col-md-10 align-items-center m-0">
          <div className="col-12 row">
            {/* card type */}
            <div className="col-12 mb-2">
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
            {/* status */}
            <div className="col-12 mb-2">
              {!isLoading ? (
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
              ) : (
                <CustomSkeleton variant="rounded" height="3.5rem" />
              )}
            </div>
          </div>
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
          {isAdvancedSearch && (
            <div className="col-12 row">
              {/* reader type */}
              {readerType && (
                <div className="col-xs-12 col-md-4 mb-2">
                  {!isLoading ? (
                    <Select
                      name="readertype"
                      register={register}
                      validation={{}}
                      errors={errors}
                      admin_temp_research
                    >
                      <option value="" hidden>
                        --- Loại bạn đọc ---
                      </option>
                      {readerType &&
                        readerType.map((item: any, index: string) => (
                          <option key={index} value={item.value}>
                            {item.title}
                          </option>
                        ))}
                    </Select>
                  ) : (
                    <CustomSkeleton variant="rounded" height="3.5rem" />
                  )}
                </div>
              )}
              {/* status */}
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
            <Tooltip title="Tìm kiếm nâng cao">
              <Button
                rounded
                icon_only
                className="fs-3"
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

export default FormAdminResearch;
