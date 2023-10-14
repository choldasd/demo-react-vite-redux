import { axiosService, ResponseService } from "./";

const getDashboardData = async (_formData:any) => {
  try {
    let _axiosData = {
      method: "post",
      url: "dashboard",
      isAuthorized: true,
      formData: _formData,
    };

    const response:any = await axiosService.hit(_axiosData);
    return response.data;

  } catch (error:any) {
    return ResponseService.buildFailure(error.message);
  }
};

export {
    getDashboardData,
};