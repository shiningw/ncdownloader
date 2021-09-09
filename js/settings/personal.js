+(function ($) {

	window.addEventListener("DOMContentLoaded", function () {
		$('.ncdownloader-personal-settings').on('click', 'input[type="button"]', function (event) {
			OC.msg.startSaving('#ncdownloader-message');
			const target = $(this).attr("data-rel");
			const http = $.ncdownloader.http;
			let inputData = http.getData(target);
			http.setData(inputData.data);
			const path = inputData.url || "/apps/ncdownloader/personal/save";
			let url = OC.generateUrl(path);
			http.setUrl(url);
			http.setHandler(function (data) {
				OC.msg.finishedSuccess('#ncdownloader-message', "OK");
			});
			http.send();
		});
	});
}
)(jQuery)