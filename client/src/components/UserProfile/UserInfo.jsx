import React, { useState, useEffect } from 'react';

function UserInfo ({ userData }) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
    <figure><img src="https://previews.dropbox.com/p/thumb/AB-kqeqqOFF1oaLQlSXOkM9Z6qf06UXc_nrn1YOhF_bZIch0uJVt5Ba342mYOnnWgwxdiIcxS8w1LlqtRGSMja6UscCcHwOjGBSemfQ3otNEORRKAXznEVEpTkadrjE-oPtQ7ar2wYkG9UhFYAiecDQKlPtkmf3n0SA6ocqoPjuEFhB3ntKv5oXNC7yjUsrAitrpxqyXBKW1gNKrbpXp7Ez1RAYFPEae_j064oh1ECp_AGXhrQBBx2HpXOD3CYIgW4-NtxsElOgGJ79lnuamsAyGh-e3gOCp-ngZgqwtcReqHLoCkRzgqpbNhOO0Q5JeTxJTRa9xu7BVUYEm4wDsRLbZq1xJ225ulI4BfqlqrSvju_cw1mf4fGlxoUPAR_ct0Ew/p.png" /></figure>
    <div className="card-body">
      <h2 className="user-name">{userData.user.first_name} {userData.user.last_name}</h2>
      <h2 className="user-location">{userData.user.city_state}</h2>
      <p>Proud parent of amazing kids. Check out my inventory of toys for rental!</p>
      <div className="card-actions justify-end">
      </div>
    </div>
  </div>
  );
};

export default UserInfo;
