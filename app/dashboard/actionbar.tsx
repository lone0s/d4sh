"use client"
import {BsArrowsCollapse, BsInfoCircleFill, BsTerminalFill, BsXCircleFill} from "react-icons/bs";

// Define the function to show modal
const showModal = (message: string) => {
  // Create a modal element
  const modal = document.createElement('div');
  modal.classList.add('modal');

  // Create content for the modal
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.textContent = message;

  // Append content to modal
  modal.appendChild(modalContent);

  // Append modal to the document body
  document.body.appendChild(modal);

  // Close modal when clicked outside
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
};

const data = [
  {
    id: 1,
    icon: BsInfoCircleFill,
    action: () => {showModal("Hello world!")},
    actionName: "Hello world!"
  },
  {
    id: 2,
    icon: BsTerminalFill,
    action: () => {showModal("Hello terminal!")},
    actionName: "Hello terminal!"
  },
  {
    id: 3,
    icon: BsXCircleFill,
    action: () => {showModal("Goodbye world :((")},
    actionName: "Goodbye world :(("
  },
];

interface Users {
  [key: string]: string;
}

export default function ActionBar() {
    return (
        <div className="flex justify-between w-2/3">
        {data.map(({icon: Icon, action, actionName}) => (
            <div key={actionName} onClick={action} className="flex items-center justify-center p-2">
            <Icon onClick={action} />
            </div>
        ))}
        </div>
    );
}


export function VictimsBar() {
  //Todo: Replace with real data
  const users : Users = {
    user1: "John Doe",
    user2: "Jane Doe",
    user3: "John Smith",
    user4: "Jane Smith"
  }


  return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">
        {Object.entries(users).map(([user, name], index) => (
            <div key={user} className={`flex items-center justify-between p-4 ${index % 2 === 0 ? '' : 'bg-gray-100'}`}>
              <h2 className="text-lg font-bold w-1/3">{name}</h2>
              <div className="flex items-center w-1/3">
                <div className="h-full border-l border-gray-300 mr-4"></div>
                <ActionBar />
              </div>
            </div>
        ))}
      </div>
  );
}