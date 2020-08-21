
import React from 'react';

function Modal(props) {

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores id sequi quaerat voluptate nisi sunt dicta temporibus culpa corporis, esse rerum, facere alias quam reprehenderit aliquid ullam cumque molestiae officia veniam? Corporis, inventore optio recusandae rem aut molestias voluptatibus error dicta distinctio sit nisi velit, ipsam aliquam repellendus minima harum reiciendis neque odit atque omnis praesentium, ipsum quaerat provident. Atque, sunt, ut, repellat incidunt veritatis sed nulla nemo alias mollitia facere perspiciatis doloremque est commodi ducimus. Et ratione distinctio quam provident corrupti quae placeat. Repudiandae quibusdam incidunt, ex sint sequi iste numquam? Obcaecati, voluptatem velit maxime pariatur ullam blanditiis. Perferendis dolores facere quae magni veritatis quo harum vero incidunt modi quos nesciunt, at suscipit vel molestias consequuntur, ut dolore mollitia animi illo debitis voluptas! Cumque libero at atque corrupti harum recusandae earum, in vero dolorum, nam quae quis aliquam iste! Beatae illo deleniti distinctio, explicabo quibusdam cumque voluptatum reiciendis fugit?
      </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal