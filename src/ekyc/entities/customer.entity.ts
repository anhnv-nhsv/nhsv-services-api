import { Auditable } from 'src/utils/auditable.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class CustomerEntity extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'acnt_no' })
  acntNo: string;

  @Column({ name: 'cntr_no' })
  cntrNo: string;

  @Column({ name: 'seq_no' })
  osSeqNo: string;

  @Column({ name: 'cust_nm' })
  custName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'mobile' })
  mobile: string;

  @Column({ name: 'idno' })
  idno: string;

  @Column({ name: 'birth_dt' })
  birthDate: string;

  @Column({ name: 'sex_tp' })
  sexType: string;

  @Column({ name: 'idno_iss_dt' })
  idnoIssDate: string;

  @Column({ name: 'idno_iss_orga' })
  idnoIssOrga: string;

  @Column({ name: 'home_addr' })
  homeAddress: string;

  @Column({ name: 'conct_addr' })
  contactAddress: string;

  @Column({ name: 'nationlity' })
  nationlity: string;

  @Column({ name: 'brch_cd' })
  branchCd: string;

  @Column({ name: 'acnt_mrgn_tp' })
  accountMarginType: string;

  @Column({ name: 'trd_onl_yn' })
  isTradingOnline: string;

  @Column({ name: 'cert_tp' })
  certificateType: string;

  @Column({ name: 'otp_recv_tp' })
  otpReceiveType: string;

  @Column({ name: 'auto_pia_tp' })
  autoPiaType: string;

  @Column({ name: 'sms_tp' })
  smsType: string;

  @Column({ name: 'email_yn' })
  isReceiveEmail: string;

  @Column({ name: 'notif_yn' })
  isReceiveNotify: string;

  @Column({ name: 'bank_cd_off_1' })
  bankCodeOff1: string;

  @Column({ name: 'bank_nm_1' })
  bankName1: string;

  @Column({ name: 'bank_brch_cd_1' })
  bankBranchCode1: string;

  @Column({ name: 'bank_brch_nm_1' })
  bankBranchName1: string;

  @Column({ name: 'bank_acnt_no_1' })
  bankAcntNo1: string;

  @Column({ name: 'bank_acnt_nm_1' })
  bankAcntName1: string;

  @Column({ name: 'bank_cd_off_2' })
  bankCodeOff2: string;

  @Column({ name: 'bank_nm_2' })
  bankName2: string;

  @Column({ name: 'bank_brch_cd_2' })
  bankBranchCode2: string;

  @Column({ name: 'bank_brch_nm_2' })
  bankBranchName2: string;

  @Column({ name: 'bank_acnt_no_2' })
  bankAcntNo2: string;

  @Column({ name: 'bank_acnt_nm_2' })
  bankAcntName2: string;

  @Column({ name: 'bank_cd_off_3' })
  bankCodeOff3: string;

  @Column({ name: 'bank_nm_3' })
  bankName3: string;

  @Column({ name: 'bank_brch_cd_3' })
  bankBranchCode3: string;

  @Column({ name: 'bank_brch_nm_3' })
  bankBranchName3: string;

  @Column({ name: 'bank_acnt_no_3' })
  bankAcntNo3: string;

  @Column({ name: 'bank_acnt_nm_3' })
  bankAcntName3: string;

  @Column({ name: 'bank_cd_off_4' })
  bankCodeOff4: string;

  @Column({ name: 'bank_nm_4' })
  bankName4: string;

  @Column({ name: 'bank_brch_cd_4' })
  bankBranchCode4: string;

  @Column({ name: 'bank_brch_nm_4' })
  bankBranchName4: string;

  @Column({ name: 'bank_acnt_no_4' })
  bankAcntNo4: string;

  @Column({ name: 'bank_acnt_nm_4' })
  bankAcntName4: string;

  @Column({ name: 'bo_fullname' })
  boFullName: string;

  @Column({ name: 'bo_dob' })
  boBirthDate: string;

  @Column({ name: 'bo_nationality' })
  boNationality: string;

  @Column({ name: 'bo_idno' })
  boIdNo: string;

  @Column({ name: 'bo_idno_iss_dt' })
  boIdnoIssDate: string;

  @Column({ name: 'bo_idno_iss_orga' })
  boIdnoIssOrga: string;

  @Column({ name: 'bo_home_addr' })
  boHomeAddress: string;

  @Column({ name: 'bo_conct_addr' })
  boContactAddress: string;

  @Column({ name: 'bo_job' })
  boJob: string;

  @Column({ name: 'bo_position' })
  boPosition: string;

  @Column({ name: 'bo_phone_no' })
  boPhoneNo: string;

  @Column({ name: 'bo_visa_no' })
  boVisaNo: string;

  @Column({ name: 'bo_visano_iss_orga' })
  boVisaIssOrga: string;

  @Column({ name: 'bo_foreign_residence' })
  boForeignResidence: string;

  @Column({ name: 'rcm_emp_no_tp' })
  recommendEmpNo: string;

  @Column({ name: 'ifno_idno' })
  partnerNo: string;

  @Column({ name: 'partner_nm' })
  partnerName: string;

  @Column({ name: 'mng_emp_yn' })
  isManagedEmp: string;

  @Column({ name: 'mng_emp_no' })
  managedEmpNo: string;

  @Column({ name: 'mng_emp_nm' })
  managedEmpName: string;

  @Column({ name: 'fatca_yn' })
  isFatca: string;

  @Column({ name: 'vnpt_point' })
  vnptPoint: string;

  @Column({ name: 'track_id' })
  trackId: string;

  @Column({ name: 'tax_cd' })
  taxCode: string;

  @Column({ name: 'send_email_cntr_yn' })
  isSendEmailContract: string;

  @Column({ name: 'ivmt_goal_tp' })
  investmentGoalType: string;

  @Column({ name: 'risk_tp' })
  riskType: string;

  @Column({ name: 'exp_yn' })
  hasExperience: string;

  @Column({ name: 'internal_cpny_nm_1' })
  internalCompanyName1: string;

  @Column({ name: 'internal_stk_1' })
  internalStock1: string;

  @Column({ name: 'internal_position_1' })
  internalPosition1: string;

  @Column({ name: 'internal_cpny_nm_2' })
  internalCompanyName2: string;

  @Column({ name: 'internal_stk_2' })
  internalStock2: string;

  @Column({ name: 'internal_position_2' })
  internalPosition2: string;

  @Column({ name: 'own_cpny_nm_1' })
  ownCompanyName1: string;

  @Column({ name: 'own_stk_1' })
  ownStock1: string;

  @Column({ name: 'own_position_1' })
  ownPosition1: string;

  @Column({ name: 'own_cpny_nm_2' })
  ownCompanyName2: string;

  @Column({ name: 'own_stk_2' })
  ownStock2: string;

  @Column({ name: 'own_position_2' })
  ownPosition2: string;
}
