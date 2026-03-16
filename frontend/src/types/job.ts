export default interface Job{
    id:number;
    job_title:string;
    company_id:number;
    status:"Applied"|"Rejected"|"Interview"|"Offer";
    notes?:string;
    application_date:string;


}