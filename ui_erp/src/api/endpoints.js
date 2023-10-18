import {
  GET_NOTTOKEN,
  POST_FILE_NOT_TOKEN,
  GET,
  POST_LOGIN,
  POST,
  UPDATE,
  DELETE,
  POST_FILE,
} from "./api";

const login = async (data) => {
  const request = await POST_LOGIN("users/login/", {
    email: data.email,
    password: data.password,
  });

  return request.data;
};

const profile = () => {
  const user_local = JSON.parse(localStorage.getItem("user") || null);
  const request = GET(`users/${user_local.username}/`);

  return request;
};

//Tasks
const get_total_tasks = async () => {
  const total = await GET("actions/");
  const actives = await GET(`actions/?is_active=true`);
  const priority = await GET(`actions/?is_priority=true`);
  const completes = await GET(`actions/?is_complete=true`);

  return {
    total: total,
    actives: actives,
    priority: priority,
    completes: completes,
  };
};

const get_tasks = async (
  page,
  filters = { is_active: null, is_complete: null, is_priority: null },
  date_range = { start_date: "", end_date: "" },
  year = "",
  month = "",
  day = "",
  person = "",
  enterprises = ""
) => {
  let string_date_rage = "";

  if (date_range.start_date) {
    string_date_rage = `${date_range.start_date},${date_range.end_date}`;
  } else {
    string_date_rage = "";
  }

  const request = await GET(
    `actions/?page=${page}&is_active=${filters.is_active}&is_complete=${filters.is_complete}&is_priority=${filters.is_priority}&date__date__range=${string_date_rage}&date__year=${year}&date__month=${month}&date__day=${day}&employee=${person}&client=${enterprises}`
  );
  return request;
};

const finish_task = async (id_task) => {
  const request = await POST(`actions/${id_task}/finish/`);
  return request;
};

const update_task = async (id_task, data) => {
  const request = await UPDATE(`actions/${id_task}/`, data);
  return request;
};

const delete_task = async (id_task) => {
  const request = await DELETE(`actions/${id_task}/`);
  return request;
};

const create_task = async (data) => {
  const task = await POST("actions/", data);
  return task;
};

//Enterprises

const get_total_enterprises = async (client) => {
  const enterprises = await GET(`clients/`);
  const enterprises_actives = await GET(
    `clients/?is_active=true${client && `&name__icontains=${client}`}`
  );
  const enterprises_inactives = await GET(`clients/?is_active=false`);

  return {
    enterprises: enterprises,
    enterprises_actives: enterprises_actives,
    enterprises_inactives: enterprises_inactives,
  };
};

const get_enterprises = async (page) => {
  const enterprises = await GET(`clients/?page=${page}&is_active=true`);

  return enterprises;
};

const get_retrive_enterprise = async (id_enterprise) => {
  const enterprise = await GET(`clients/${id_enterprise}/`);

  return enterprise;
};

const create_enterprise = async (data) => {
  const enterprise = await POST("clients/", data);

  return enterprise;
};

const delete_enterprise = async (id_enterprise) => {
  const enterprise = await DELETE(`clients/${id_enterprise}/`);

  return enterprise;
};

const update_enterprise = async (id_enterprise, data) => {
  const enterprise = await UPDATE(`clients/${id_enterprise}/`, data);

  return enterprise;
};

const search_enterprise = async (name_enterprise, page) => {
  const search = await GET(
    `clients/?is_active=true&name__contains=${name_enterprise}`
  );

  return search;
};

//Employess
const get_employess = async (page, is_active, enterprise) => {
  if (!enterprise) {
    enterprise = "";
  }
  const employess = await GET(
    `employess/?page=${page}&is_active=${is_active}&enterprise=${enterprise}`
  );
  return employess;
};

const get_totals_employees = async () => {
  const enterprises = await GET(`employess/`);
  const enterprises_actives = await GET(`employess/?is_active=true`);
  const enterprises_inactives = await GET(`employess/?is_active=false`);

  return {
    employess: enterprises.data,
    employess_actives: enterprises_actives.data,
    employess_inactives: enterprises_inactives.data,
  };
};

const delete_employee = async (id_employee) => {
  const employee = await DELETE(`employess/${id_employee}/`);

  return employee;
};

const update_employee = async (id_employee, data) => {
  const employee = await UPDATE(`employess/${id_employee}/`, data);

  return employee;
};

const create_employee = async (data) => {
  const employee = await POST("employess/", data);

  return employee;
};

const search_employee = async (name_employee, page) => {
  const search = await GET(
    `employess/?is_active=true&name__contains=${name_employee}`
  );
  console.log(search);

  return search;
};

//Type Actions
const get_type_actions = async (page) => {
  const type_tasks = await GET(`type_actions/?page=${page}`);

  return type_tasks;
};

const create_type_task = async (data) => {
  const type_task = await POST("type_actions/", data);

  return type_task;
};

const delete_type_task = async (id_task) => {
  const delete_type_task = await DELETE(`type_actions/${id_task}/`);

  return delete_type_task;
};

const update_type_task = async (id_task, data) => {
  const update_type_task = await UPDATE(`type_actions/${id_task}/`, data);

  return update_type_task;
};

const search_type_task = async (name_type_task) => {
  const search = await GET(
    `type_actions/?description__contains=${name_type_task}`
  );

  return search;
};

const get_list_quotation = async () => {
  const rq = await GET("quotation/?is_external_client=true");
  return rq;
};

const get_list_quotationf = async () => {
  const rq = await GET("quotation/?is_external_client=false");
  return rq;
};

const list_economic = async () => {
  const rq = await GET("economic_activities/");
  return rq;
};

const create_economic = async (data) => {
  const rq = await POST("economic_activities/", data);
  return rq;
};

const delete_economic = async (id) => {
  const rq = await DELETE(`economic_activities/${id}/`);
  return rq;
};

const create_project = async (data) => {
  const rq = await POST("projects/", data);
  return rq;
};

const retrieve_project = async (id) => {
  const rq = await GET(`projects/${id}/`);
  return rq;
};

const list_project = async (client, code_internal) => {
  const rq = await GET(
    `projects/?client=${client}&code_internal__icontains=${code_internal}`
  );
  return rq;
};

const update_project = async (id, data) => {
  const rq = await UPDATE(`projects/${id}/`, data);
  return rq;
};

const delete_project = async (id) => {
  const rq = await DELETE(`projects/${id}/`);
  return rq;
};

const create_telement = async (data) => {
  const rq = await POST("type_element/", data);
  return rq;
};

const list_telements = async (type) => {
  const rq = await GET(`type_element/?deparment=${type ? type : ""}`);
  return rq;
};

const update_telement = async (id, data) => {
  const rq = await UPDATE(`type_element/${id}/`, data);
  return rq;
};

const delete_telement = async (id) => {
  const rq = await DELETE(`type_element/${id}/`);
  return rq;
};

const create_velement = async (data) => {
  const rq = await POST_FILE("value_element/", data);
  return rq;
};

const list_velements = async (project, type_element) => {
  const rq = await GET(
    `value_element/?${project && `project=${project}`}${
      type_element && `&type_element=${type_element}`
    }`
  );
  return rq;
};

const update_velement = async (id, data) => {
  console.log(id);
  const rq = await UPDATE(`value_element/${id.id}/`, data);
  return rq;
};

const delete_velement = async (id) => {
  const rq = await DELETE(`value_element/${id}/`);
  return rq;
};

const create_workload = async (data) => {
  const rq = await POST_LOGIN("workloads/", data);
  return rq;
};

const list_workloads = async () => {
  const rq = await GET_NOTTOKEN(`workloads/`);
  return rq;
};

const update_workloads = async (id, data) => {
  console.log(id);
  const rq = await UPDATE(`workloads/${id}/`, data);
  return rq;
};

const delete_workload = async (id) => {
  const rq = await DELETE(`workloads/${id}/`);
  return rq;
};

const list_liftings_external = async () => {
  const rq = await GET_NOTTOKEN("liftings/?is_external=true");
  return rq;
};

const deleteLifting = async (id) => {
  const rq = await DELETE(`liftings/${id}/`);
  return rq;
};

const list_general = async (client_id) => {
  const rq = await GET_NOTTOKEN(`liftings/?client=${client_id}`);
  return rq;
};

const retrieve_lifting = async (uuid) => {
  const rq = await GET_NOTTOKEN(`liftings/${uuid}`);
  return rq;
};

const list_liftings_internal = async () => {
  const rq = await GET("liftings/?is_external=false");
  return rq;
};

const create_lifting = async (data) => {
  const rq = await POST_LOGIN("liftings/", data);
  return rq;
};

const create_external_client = async (data) => {
  const rq = await POST_LOGIN("clients_external/", data);
  return rq;
};

const create_well = async (data) => {
  const rq = await POST_LOGIN("wells/", data);
  return rq;
};

const create_photo = async (well) => {
  const rq = await POST_FILE_NOT_TOKEN("photos_well/", [
    { key: "photo", value: well.file },
    { key: "well", value: well.id },
  ]);
  return rq;
};

const create_resolution_info = async (data) => {
  const rq = await POST("resolution_info/", data);
  return rq;
};

const retrieve_resolution_info = async (id_well) => {
  const rq = await GET(`resolution_info/?well=${id_well}`);
  return rq;
};

const update_resolution_info = async (data, id) => {
  const rq = await UPDATE(`resolution_info/${id}/`, data);
  return rq;
};

const update_lifting = async (uuid, data) => {
  const rq = await UPDATE(`liftings/${uuid}/`, data);
  return rq;
};

const create_company_departament = async (data) => {
  const rq = await POST("company_deparments/", data);
  return rq;
};

const retrieve_company_deparment = async (id) => {
  const rq = await GET(`company_deparments/?well=${id}`);
  return rq;
};

const update_compant_deparment = async (data, id) => {
  const rq = await UPDATE(`company_deparments/${id}/`, data);
  return rq;
};

const list_compant_deparments = async () => {
  const rq = await GET(`company_deparments`);
  return rq;
};

const delete_company_deparment = async (id) => {
  const rq = await DELETE(`company_deparments/${id}/`);
  return rq;
};

const api = {
  user: {
    login,
    profile,
  },
  tasks: {
    get_total_tasks,
    get_tasks,
    finish_task,
    update_task,
    delete_task,
    create_task,
  },
  enterprises: {
    get_total_enterprises,
    get_enterprises,
    get_retrive_enterprise,
    create_enterprise,
    delete_enterprise,
    update_enterprise,
    search_enterprise,
    list_economic,
    create_economic,
    delete_economic,
  },
  employess: {
    get_totals_employees,
    get_employess,
    delete_employee,
    update_employee,
    create_employee,
    search_employee,
  },
  type_tasks: {
    get_type_actions,
    create_type_task,
    delete_type_task,
    update_type_task,
    search_type_task,
  },
  projects: {
    company_deparments: {
      create: create_company_departament,
      list: list_compant_deparments,
      update: update_compant_deparment,
      retrieve: retrieve_company_deparment,
      delete: delete_company_deparment,
    },
    project: {
      create: create_project,
      list: list_project,
      update: update_project,
      retrieve: retrieve_project,
      delete: delete_project,
    },
    types_elements: {
      create: create_telement,
      list: list_telements,
      update: update_telement,
      delete: delete_telement,
    },
    values_elements: {
      create: create_velement,
      list: list_velements,
      update: update_velement,
      delete: delete_velement,
    },
  },
  worklands: {
    create: create_workload,
    list: list_workloads,
    update: update_workloads,
    delete: delete_workload,
  },
  liftings: {
    list_general: list_general,
    retrieve: retrieve_lifting,
    list_external: list_liftings_external,
    list_internal: list_liftings_internal,
    create: create_lifting,
    update: update_lifting,
    delete: deleteLifting,
    wells: {
      create: create_well,
      photo: create_photo,
      resolution_info: {
        create: create_resolution_info,
        update: update_resolution_info,
        retrieve: retrieve_resolution_info,
      },
    },
  },
  external_clients: {
    create: create_external_client,
  },
  quotation: {
    list: get_list_quotation,
    listf: get_list_quotationf,
  },
};

export default api;
