/**
 * ownCloud - ocDownloader
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE file.
 *
 * @author Xavier Beurois <www.sgc-univ.net>
 * @copyright Xavier Beurois 2015
 */

window.addEventListener('DOMContentLoaded', function () {
	$('.ncdownloader-admin-settings').on('click', 'input[type="button"]', function (event) {
		OC.msg.startSaving('#ncdownloader-message');
		const target = $(this).attr("data-rel");
		const http = $.ncdownloader.http;
		let inputData = http.getData(target);
		http.setData(inputData.data);
		const path = inputData.url || "/apps/ncdownloader/admin/save";
		let url = OC.generateUrl(path);
		http.setUrl(url);
		http.setHandler(function () {
			OC.msg.finishedSuccess('#ncdownloader-message', "OK");
		});
		http.send();
	});
});
