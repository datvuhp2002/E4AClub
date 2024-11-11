interface ReaderPublishSearchDto {
  cardType: string;
  fullName: string;
  registrationCode: string;
}
interface UpdateStatusRegisterDto {
  id: string;
  status: string;
  note: string;
}
interface UpdatePaymentStatusDto {
  id: string;
  status: boolean;
}
