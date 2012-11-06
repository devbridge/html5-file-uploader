using System.Web;
using System.Web.Mvc;

namespace Html5UploadDemo.Controllers
{
    public class FileController : Controller
    {
        public ActionResult Upload(HttpPostedFileBase file)
        {
            return Json(new
            {
                Success = true,
                FileName = file.FileName,
                FileSize = file.ContentLength
            }, JsonRequestBehavior.AllowGet);
        }

    }
}
