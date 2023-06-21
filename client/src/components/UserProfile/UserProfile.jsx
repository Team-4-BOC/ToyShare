import React, { useState, useEffect } from 'react';

function UserProfile () {
  return (
    <div className="profile">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://previews.dropbox.com/p/thumb/AB-kqeqqOFF1oaLQlSXOkM9Z6qf06UXc_nrn1YOhF_bZIch0uJVt5Ba342mYOnnWgwxdiIcxS8w1LlqtRGSMja6UscCcHwOjGBSemfQ3otNEORRKAXznEVEpTkadrjE-oPtQ7ar2wYkG9UhFYAiecDQKlPtkmf3n0SA6ocqoPjuEFhB3ntKv5oXNC7yjUsrAitrpxqyXBKW1gNKrbpXp7Ez1RAYFPEae_j064oh1ECp_AGXhrQBBx2HpXOD3CYIgW4-NtxsElOgGJ79lnuamsAyGh-e3gOCp-ngZgqwtcReqHLoCkRzgqpbNhOO0Q5JeTxJTRa9xu7BVUYEm4wDsRLbZq1xJ225ulI4BfqlqrSvju_cw1mf4fGlxoUPAR_ct0Ew/p.png" /></figure>
        <div className="card-body">
          <h2 className="user-name">Maxine Smith</h2>
          <h2 className="user-location">San Diego, CA</h2>
          <p>Proud mother of two boys who love cars. Check out my large inventory of car toys for rental!</p>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <h2 className="rental-inventory">Rental Inventory</h2>
          <ul>
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
          </ul>
        </li>
      </ul>
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <h2 className="rental-current">Currently Renting</h2>
          <ul>
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
          </ul>
        </li>
      </ul>
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <h2 className="rental-history">Rental History</h2>
          <ul>
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
          </ul>
        </li>
      </ul>
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <h2 className="saved">Saved Toys</h2>
          <ul>
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
