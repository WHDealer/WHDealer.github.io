import React from 'react';

interface IconProps {
  filled: boolean;
}

const Newsfeed: React.FC<IconProps> = (props) => {
  const { filled } = props;

  if (filled)
    return (
      <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.25 11.75C4.25 7.97876 4.25 6.09315 5.42157 4.92157C6.59315 3.75 8.47876 3.75 12.25 3.75H18.75C22.5212 3.75 24.4069 3.75 25.5784 4.92157C26.75 6.09315 26.75 7.97876 26.75 11.75V17.9363C26.75 19.5713 26.75 20.3888 26.4455 21.1239C26.141 21.859 25.563 22.437 24.4069 23.5931L24.0931 23.9069C22.937 25.063 22.359 25.641 21.6239 25.9455C20.8888 26.25 20.0713 26.25 18.4363 26.25H12.25C8.47876 26.25 6.59315 26.25 5.42157 25.0784C4.25 23.9069 4.25 22.0212 4.25 18.25V11.75Z"
          fill="#E9DAF2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.4497 3H15.5H15.5503C17.9733 2.99999 19.8589 2.99999 21.3431 3.17543C22.8542 3.35404 24.0466 3.72337 25.0322 4.53218C25.3739 4.81267 25.6873 5.12607 25.9678 5.46785C26.7766 6.45338 27.146 7.64584 27.3246 9.15689C27.5 10.6411 27.5 12.5266 27.5 14.9496V14.9497V15V17.7145L27.5 17.787V17.7871V17.7871V17.7871V17.7871C27.5001 18.751 27.5001 19.3256 27.4073 19.8798C27.238 20.8904 26.8408 21.8493 26.2458 22.6837C25.9196 23.1412 25.5132 23.5475 24.8316 24.2291L24.7803 24.2803L24.7291 24.3316C24.0475 25.0132 23.6412 25.4196 23.1837 25.7458C22.3493 26.3408 21.3904 26.738 20.3798 26.9073C19.8256 27.0001 19.251 27.0001 18.2871 27H18.2871H18.2871H18.2871H18.287L18.2145 27H15.5H15.4497H15.4496C13.0266 27 11.1411 27 9.65689 26.8246C8.14584 26.646 6.95338 26.2766 5.96785 25.4678C5.62607 25.1873 5.31267 24.8739 5.03218 24.5322C4.22337 23.5466 3.85404 22.3542 3.67543 20.8431C3.49999 19.3589 3.49999 17.4733 3.5 15.0503V15V14.9497C3.49999 12.5267 3.49999 10.6411 3.67543 9.15689C3.85404 7.64584 4.22337 6.45338 5.03218 5.46785C5.31267 5.12607 5.62607 4.81267 5.96785 4.53218C6.95338 3.72337 8.14584 3.35404 9.65689 3.17543C11.1411 2.99999 13.0267 2.99999 15.4497 3ZM9.83297 4.66506C8.46353 4.82693 7.59343 5.13857 6.91944 5.6917C6.65361 5.90986 6.40986 6.15361 6.1917 6.41944C5.63857 7.09343 5.32693 7.96353 5.16506 9.33297C5.00123 10.719 5 12.516 5 15C5 17.484 5.00123 19.281 5.16506 20.667C5.32693 22.0365 5.63857 22.9066 6.1917 23.5806C6.40986 23.8464 6.65361 24.0901 6.91944 24.3083C7.59343 24.8614 8.46353 25.1731 9.83297 25.3349C11.219 25.4988 13.016 25.5 15.5 25.5H18.2145C18.9665 25.5 19.408 25.4988 19.75 25.473V24L19.75 23.948V23.9479C19.75 23.0495 19.7499 22.3003 19.8299 21.7055C19.9143 21.0777 20.1 20.5109 20.5555 20.0554C21.0109 19.5999 21.5777 19.4143 22.2055 19.3299C22.8003 19.2499 23.5495 19.2499 24.448 19.25H24.448L24.5 19.25H25.973C25.9988 18.908 26 18.4665 26 17.7145V15C26 12.516 25.9988 10.719 25.8349 9.33297C25.6731 7.96353 25.3614 7.09343 24.8083 6.41944C24.5901 6.15361 24.3464 5.90986 24.0806 5.6917C23.4066 5.13857 22.5365 4.82693 21.167 4.66506C19.781 4.50123 17.984 4.5 15.5 4.5C13.016 4.5 11.219 4.50123 9.83297 4.66506ZM25.6102 20.75H24.5C23.536 20.75 22.8884 20.7516 22.4054 20.8165C21.9439 20.8785 21.7464 20.9858 21.6161 21.1161C21.4858 21.2464 21.3786 21.4439 21.3165 21.9054C21.2516 22.3884 21.25 23.036 21.25 24V25.1102C21.6245 24.9572 21.9813 24.7609 22.3128 24.5245C22.6565 24.2795 22.9717 23.9676 23.7197 23.2197C24.4676 22.4717 24.7795 22.1565 25.0245 21.8128C25.2609 21.4813 25.4572 21.1245 25.6102 20.75ZM8.5 8.75C8.5 8.33579 8.83579 8 9.25 8H19.25C19.6642 8 20 8.33579 20 8.75C20 9.16421 19.6642 9.5 19.25 9.5H9.25C8.83579 9.5 8.5 9.16421 8.5 8.75ZM9.25 13C8.83579 13 8.5 13.3358 8.5 13.75C8.5 14.1642 8.83579 14.5 9.25 14.5H16.75C17.1642 14.5 17.5 14.1642 17.5 13.75C17.5 13.3358 17.1642 13 16.75 13H9.25ZM8.5 18.75C8.5 18.3358 8.83579 18 9.25 18H11.75C12.1642 18 12.5 18.3358 12.5 18.75C12.5 19.1642 12.1642 19.5 11.75 19.5H9.25C8.83579 19.5 8.5 19.1642 8.5 18.75Z"
          fill="#634675"
        />
      </svg>
    );

  return (
    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4497 3L15.5 3L15.5503 3C17.9733 2.99999 19.8589 2.99999 21.3431 3.17543C22.8542 3.35404 24.0466 3.72337 25.0322 4.53218C25.3739 4.81267 25.6873 5.12607 25.9678 5.46785C26.7766 6.45338 27.146 7.64584 27.3246 9.15689C27.5 10.6411 27.5 12.5266 27.5 14.9496V14.9497V15V17.7145L27.5 17.787V17.7871V17.7871V17.7871V17.7871C27.5001 18.751 27.5001 19.3256 27.4073 19.8798C27.238 20.8904 26.8408 21.8493 26.2458 22.6837C25.9196 23.1412 25.5132 23.5475 24.8316 24.2291L24.7803 24.2803L24.7291 24.3316C24.0475 25.0132 23.6412 25.4196 23.1837 25.7458C22.3493 26.3408 21.3904 26.738 20.3798 26.9073C19.8256 27.0001 19.251 27.0001 18.2871 27H18.2871H18.2871H18.2871H18.287L18.2145 27H15.5H15.4497H15.4496C13.0266 27 11.1411 27 9.65689 26.8246C8.14584 26.646 6.95338 26.2766 5.96785 25.4678C5.62607 25.1873 5.31267 24.8739 5.03218 24.5322C4.22337 23.5466 3.85404 22.3542 3.67543 20.8431C3.49999 19.3589 3.49999 17.4733 3.5 15.0503L3.5 15L3.5 14.9497C3.49999 12.5267 3.49999 10.6411 3.67543 9.15689C3.85404 7.64584 4.22337 6.45338 5.03218 5.46785C5.31267 5.12607 5.62607 4.81267 5.96785 4.53218C6.95338 3.72337 8.14584 3.35404 9.65689 3.17543C11.1411 2.99999 13.0267 2.99999 15.4497 3ZM9.83297 4.66506C8.46353 4.82693 7.59343 5.13857 6.91944 5.6917C6.65361 5.90986 6.40986 6.15361 6.1917 6.41944C5.63857 7.09343 5.32693 7.96353 5.16506 9.33297C5.00123 10.719 5 12.516 5 15C5 17.484 5.00123 19.281 5.16506 20.667C5.32693 22.0365 5.63857 22.9066 6.1917 23.5806C6.40986 23.8464 6.65361 24.0901 6.91944 24.3083C7.59343 24.8614 8.46353 25.1731 9.83297 25.3349C11.219 25.4988 13.016 25.5 15.5 25.5H18.2145C18.9665 25.5 19.408 25.4988 19.75 25.473V24L19.75 23.948V23.9479C19.75 23.0495 19.7499 22.3003 19.8299 21.7055C19.9143 21.0777 20.1 20.5109 20.5555 20.0554C21.0109 19.5999 21.5777 19.4143 22.2055 19.3299C22.8003 19.2499 23.5495 19.2499 24.448 19.25H24.448L24.5 19.25H25.973C25.9988 18.908 26 18.4665 26 17.7145V15C26 12.516 25.9988 10.719 25.8349 9.33297C25.6731 7.96353 25.3614 7.09343 24.8083 6.41944C24.5901 6.15361 24.3464 5.90986 24.0806 5.6917C23.4066 5.13857 22.5365 4.82693 21.167 4.66506C19.781 4.50123 17.984 4.5 15.5 4.5C13.016 4.5 11.219 4.50123 9.83297 4.66506ZM25.6102 20.75H24.5C23.536 20.75 22.8884 20.7516 22.4054 20.8165C21.9439 20.8785 21.7464 20.9858 21.6161 21.1161C21.4858 21.2464 21.3786 21.4439 21.3165 21.9054C21.2516 22.3884 21.25 23.036 21.25 24V25.1102C21.6245 24.9572 21.9813 24.7609 22.3128 24.5245C22.6565 24.2795 22.9717 23.9676 23.7197 23.2197C24.4676 22.4717 24.7795 22.1565 25.0245 21.8128C25.2609 21.4813 25.4572 21.1245 25.6102 20.75ZM8.5 8.75C8.5 8.33579 8.83579 8 9.25 8H19.25C19.6642 8 20 8.33579 20 8.75C20 9.16421 19.6642 9.5 19.25 9.5H9.25C8.83579 9.5 8.5 9.16421 8.5 8.75ZM9.25 13C8.83579 13 8.5 13.3358 8.5 13.75C8.5 14.1642 8.83579 14.5 9.25 14.5H16.75C17.1642 14.5 17.5 14.1642 17.5 13.75C17.5 13.3358 17.1642 13 16.75 13H9.25ZM8.5 18.75C8.5 18.3358 8.83579 18 9.25 18H11.75C12.1642 18 12.5 18.3358 12.5 18.75C12.5 19.1642 12.1642 19.5 11.75 19.5H9.25C8.83579 19.5 8.5 19.1642 8.5 18.75Z"
        fill="#005f71"
      />
    </svg>
  );
};

const Mobility: React.FC<IconProps> = (props) => {
  const { filled } = props;

  if (filled)
    return (
      <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.3125 10H28.3125V18.25C28.3125 22.0212 28.3125 23.9069 27.1409 25.0784C25.9694 26.25 24.0837 26.25 20.3125 26.25H11.3125C7.54126 26.25 5.65565 26.25 4.48407 25.0784C3.3125 23.9069 3.3125 22.0212 3.3125 18.25V10Z"
          fill="#E9DAF2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.89547 4.66517C10.0782 4.52536 11.5603 4.50397 13.5132 4.5007L16.3629 9.25011H11.2538L8.71888 4.68724C8.77681 4.6796 8.83566 4.67224 8.89547 4.66517ZM7.19165 5.02693C6.71242 5.19488 6.32219 5.41257 5.98194 5.69181C5.71611 5.90997 5.47236 6.15372 5.2542 6.41955C4.71232 7.07983 4.40221 7.92832 4.23762 9.25011H9.53787L7.19165 5.02693ZM10.7992 10.7501H4.1172C4.06308 11.9003 4.0625 13.2868 4.0625 15.0001C4.0625 17.4841 4.06373 19.2811 4.22756 20.6671C4.38943 22.0366 4.70107 22.9067 5.2542 23.5807C5.47236 23.8465 5.71611 24.0903 5.98194 24.3084C6.65593 24.8615 7.52603 25.1732 8.89547 25.3351C10.2815 25.4989 12.0785 25.5001 14.5625 25.5001H17.0625C19.5465 25.5001 21.3435 25.4989 22.7295 25.3351C24.099 25.1732 24.9691 24.8615 25.6431 24.3084C25.9089 24.0903 26.1526 23.8465 26.3708 23.5807C26.9239 22.9067 27.2356 22.0366 27.3974 20.6671C27.5613 19.2811 27.5625 17.4841 27.5625 15.0001C27.5625 13.2868 27.5619 11.9003 27.5078 10.7501H24.5762C24.5675 10.7503 24.5589 10.7503 24.5502 10.7501H17.7012C17.6925 10.7503 17.6839 10.7503 17.6752 10.7501H10.8271C10.8178 10.7503 10.8085 10.7503 10.7992 10.7501ZM15.2621 4.50011L18.1121 9.25011H23.2379L20.4018 4.52338C19.4468 4.50044 18.3464 4.50011 17.0625 4.50011H15.2621ZM14.5122 3.00011L13.9539 3.0002C13.9423 2.99993 13.9306 2.99993 13.919 3.00021C11.7785 3.00132 10.0802 3.01468 8.71939 3.17554C7.20834 3.35415 6.01588 3.72349 5.03035 4.53229C4.68857 4.81278 4.37517 5.12618 4.09468 5.46796C3.28587 6.45349 2.91654 7.64595 2.73793 9.15701C2.72183 9.29322 2.7072 9.43281 2.69392 9.57589C2.61102 9.69654 2.5625 9.84266 2.5625 10.0001C2.5625 10.1176 2.58951 10.2288 2.63766 10.3278C2.56249 11.6019 2.56249 13.1231 2.5625 14.9498V15.0001V15.0504C2.56249 17.4734 2.56249 19.359 2.73793 20.8432C2.91654 22.3543 3.28587 23.5467 4.09468 24.5323C4.37517 24.874 4.68857 25.1874 5.03035 25.4679C6.01588 26.2767 7.20834 26.6461 8.71939 26.8247C10.2036 27.0001 12.0891 27.0001 14.5121 27.0001H14.5122H14.5625H17.0625H17.1128H17.1129C19.5359 27.0001 21.4214 27.0001 22.9056 26.8247C24.4167 26.6461 25.6091 26.2767 26.5947 25.4679C26.9364 25.1874 27.2498 24.874 27.5303 24.5323C28.3391 23.5467 28.7085 22.3543 28.8871 20.8432C29.0625 19.359 29.0625 17.4735 29.0625 15.0505V15.0505V15.0001V14.9498V14.9497V14.9496C29.0625 13.123 29.0625 11.6018 28.9873 10.3277C29.0355 10.2288 29.0625 10.1176 29.0625 10.0001C29.0625 9.84266 29.014 9.69655 28.9311 9.57589C28.9178 9.43282 28.9032 9.29322 28.8871 9.15701C28.7085 7.64595 28.3391 6.45349 27.5303 5.46796C27.2498 5.12618 26.9364 4.81278 26.5947 4.53229C25.6091 3.72349 24.4167 3.35415 22.9056 3.17554C22.3499 3.10986 21.738 3.06877 21.0627 3.04306C20.9185 2.99213 20.7597 2.98534 20.6083 3.02825C19.5873 3.0001 18.4294 3.00011 17.1128 3.00011L17.0625 3.00011H14.5625L14.5122 3.00011ZM24.9871 9.25011L22.2044 4.61226C22.3859 4.62768 22.5608 4.64522 22.7295 4.66517C24.099 4.82704 24.9691 5.13868 25.6431 5.69181C25.9089 5.90997 26.1526 6.15372 26.3708 6.41955C26.9127 7.07983 27.2228 7.92832 27.3874 9.25011H24.9871Z"
          fill="#634675"
        />
      </svg>
    );

  return (
    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.0893 4.52338C19.1343 4.50044 18.0339 4.50011 16.75 4.50011H14.9496L17.7996 9.25011H22.9254L20.0893 4.52338ZM8.40689 3.17554C9.76775 3.01468 11.466 3.00132 13.6065 3.00021C13.6181 2.99993 13.6298 2.99993 13.6414 3.0002L14.1997 3.00011L14.25 3.00011H16.75L16.8003 3.00011C18.1169 3.00011 19.2748 3.0001 20.2958 3.02825C20.4472 2.98534 20.606 2.99213 20.7502 3.04306C21.4255 3.06877 22.0374 3.10986 22.5931 3.17554C24.1042 3.35415 25.2966 3.72349 26.2822 4.53229C26.6239 4.81278 26.9373 5.12618 27.2178 5.46796C28.0266 6.45349 28.396 7.64595 28.5746 9.15701C28.5907 9.29322 28.6053 9.43282 28.6186 9.57589C28.7015 9.69655 28.75 9.84266 28.75 10.0001C28.75 10.1176 28.723 10.2288 28.6748 10.3277C28.75 11.6018 28.75 13.123 28.75 14.9496V14.9497V14.9498V15.0001V15.0505V15.0505C28.75 17.4735 28.75 19.359 28.5746 20.8432C28.396 22.3543 28.0266 23.5467 27.2178 24.5323C26.9373 24.874 26.6239 25.1874 26.2822 25.4679C25.2966 26.2767 24.1042 26.6461 22.5931 26.8247C21.1089 27.0001 19.2234 27.0001 16.8004 27.0001H16.8003H16.75H14.25H14.1997H14.1996C11.7766 27.0001 9.89111 27.0001 8.40689 26.8247C6.89584 26.6461 5.70338 26.2767 4.71785 25.4679C4.37607 25.1874 4.06267 24.874 3.78218 24.5323C2.97337 23.5467 2.60404 22.3543 2.42543 20.8432C2.24999 19.359 2.24999 17.4734 2.25 15.0504L2.25 15.0001L2.25 14.9498C2.24999 13.1231 2.24999 11.6019 2.32516 10.3278C2.27701 10.2288 2.25 10.1176 2.25 10.0001C2.25 9.84266 2.29852 9.69654 2.38142 9.57589C2.3947 9.43281 2.40933 9.29322 2.42543 9.15701C2.60404 7.64595 2.97337 6.45349 3.78218 5.46796C4.06267 5.12618 4.37607 4.81278 4.71785 4.53229C5.70338 3.72349 6.89584 3.35415 8.40689 3.17554ZM16.0504 9.25011L13.2007 4.5007C11.2478 4.50397 9.76573 4.52536 8.58297 4.66517C8.52316 4.67224 8.46431 4.6796 8.40638 4.68724L10.9413 9.25011H16.0504ZM10.4867 10.7501C10.496 10.7503 10.5053 10.7503 10.5146 10.7501H17.3627C17.3684 10.7502 17.3742 10.7502 17.3799 10.7502C17.3828 10.7502 17.3858 10.7502 17.3887 10.7501H24.2377L24.2482 10.7502L24.2637 10.7501H27.1953C27.2494 11.9003 27.25 13.2868 27.25 15.0001C27.25 17.4841 27.2488 19.2811 27.0849 20.6671C26.9231 22.0366 26.6114 22.9067 26.0583 23.5807C25.8401 23.8465 25.5964 24.0903 25.3306 24.3084C24.6566 24.8615 23.7865 25.1732 22.417 25.3351C21.031 25.4989 19.234 25.5001 16.75 25.5001H14.25C11.766 25.5001 9.96897 25.4989 8.58297 25.3351C7.21353 25.1732 6.34343 24.8615 5.66944 24.3084C5.40361 24.0903 5.15986 23.8465 4.9417 23.5807C4.38857 22.9067 4.07693 22.0366 3.91506 20.6671C3.75123 19.2811 3.75 17.4841 3.75 15.0001C3.75 13.2868 3.75058 11.9003 3.8047 10.7501H10.4867ZM9.22537 9.25011H3.92512C4.08971 7.92832 4.39982 7.07983 4.9417 6.41955C5.15986 6.15372 5.40361 5.90997 5.66944 5.69181C6.00969 5.41257 6.39992 5.19488 6.87915 5.02693L9.22537 9.25011ZM24.6746 9.25011L21.8919 4.61226C22.0734 4.62768 22.2483 4.64522 22.417 4.66517C23.7865 4.82704 24.6566 5.13868 25.3306 5.69181C25.5964 5.90997 25.8401 6.15372 26.0583 6.41955C26.6002 7.07983 26.9103 7.92832 27.0749 9.25011H24.6746Z"
        fill="#005f71"
      />
    </svg>
  );
};

const Consulting: React.FC<IconProps> = (props) => {
  const { filled } = props;

  if (filled)
    return (
      <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.6314 19.4081L24.3073 20.0771C25.144 20.2863 25.5623 20.3909 25.8767 20.6197C26.1793 20.8398 26.414 21.1405 26.5542 21.4875C26.7 21.848 26.7 22.2792 26.7 23.1416C26.7 24.2117 26.7 24.7468 26.471 25.1832C26.2644 25.5768 25.8647 25.9395 25.4528 26.1068C24.9963 26.2923 24.5127 26.2451 23.5457 26.1508C20.3458 25.8386 17.4904 25.0417 15.0198 23.8003C11.3572 21.96 8.54022 19.143 6.69995 15.4805C5.45857 13.0098 4.66165 10.1544 4.34944 6.95457C4.25509 5.98752 4.20792 5.504 4.39344 5.04742C4.56078 4.63558 4.92344 4.23582 5.31708 4.02928C5.75349 3.80029 6.28855 3.80029 7.35869 3.80029C8.22107 3.80029 8.65226 3.80029 9.01279 3.946C9.35974 4.08621 9.6604 4.32096 9.88058 4.62354C10.1094 4.93797 10.214 5.35629 10.4231 6.19292L10.4231 6.19292L11.0921 8.86886C11.3877 10.0511 11.5354 10.6422 11.3575 11.1888C11.1795 11.7354 10.7121 12.1262 9.77715 12.9078L6.69995 15.4805C8.54022 19.143 11.3572 21.96 15.0198 23.8003L17.5924 20.7231C18.3741 19.7882 18.7649 19.3207 19.3114 19.1428C19.858 18.9648 20.4491 19.1126 21.6314 19.4081Z"
          fill="#E9DAF2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.73177 4.64152C8.53947 4.56381 8.28813 4.55046 7.35869 4.55046C6.81042 4.55046 6.44789 4.55114 6.16663 4.57614C5.89852 4.59996 5.76367 4.64209 5.66555 4.69357C5.42885 4.81777 5.1889 5.08227 5.08828 5.32991C4.98807 5.57654 4.99453 5.84282 5.09591 6.8819C5.36427 9.63248 5.99837 12.1063 6.96336 14.2828L9.2961 12.3326C9.7755 11.9318 10.0905 11.6672 10.313 11.438C10.5233 11.2214 10.6033 11.0828 10.6443 10.9568C10.6854 10.8307 10.7022 10.6716 10.6598 10.3728C10.6149 10.0565 10.516 9.65715 10.3645 9.05093L9.69551 6.37499C9.47008 5.47329 9.39618 5.2327 9.27414 5.06499C9.13653 4.87587 8.94862 4.72916 8.73177 4.64152ZM7.6441 15.6689L10.2582 13.4834L10.2868 13.4594C10.7299 13.089 11.106 12.7747 11.3894 12.4827C11.6911 12.1718 11.9337 11.8417 12.0707 11.4211C12.2076 11.0006 12.2058 10.5909 12.1449 10.162C12.0877 9.7591 11.9688 9.28357 11.8287 8.72328L11.8197 8.68713L11.1507 6.01118C11.1399 5.96779 11.1292 5.92495 11.1187 5.88266C10.942 5.17299 10.8037 4.61764 10.487 4.18243C10.1843 3.76637 9.77088 3.4436 9.29382 3.2508C8.79479 3.04913 8.22248 3.04967 7.49115 3.05037C7.44757 3.05041 7.40342 3.05046 7.35869 3.05046L7.32684 3.05046C6.8189 3.05044 6.38936 3.05043 6.03385 3.08202C5.6578 3.11544 5.30691 3.18781 4.96862 3.36531C4.41804 3.6542 3.93267 4.18922 3.69861 4.76525C3.44204 5.3967 3.50741 6.05887 3.58925 6.88781C3.5938 6.93387 3.5984 6.98045 3.603 7.02756C3.92298 10.3072 4.74181 13.2539 6.0298 15.8173C7.94247 19.624 10.8764 22.5579 14.6831 24.4706C17.2465 25.7586 20.1932 26.5774 23.4729 26.8974C23.52 26.902 23.5665 26.9066 23.6126 26.9112C24.4415 26.993 25.1037 27.0584 25.7352 26.8018C26.3112 26.5677 26.8462 26.0824 27.1351 25.5318C27.3126 25.1935 27.385 24.8426 27.4184 24.4666C27.45 24.1111 27.45 23.6815 27.45 23.1736L27.45 23.1417C27.45 23.097 27.45 23.0528 27.45 23.0093C27.4507 22.2779 27.4513 21.7056 27.2496 21.2066C27.0568 20.7295 26.734 20.3161 26.318 20.0134C25.8828 19.6967 25.3274 19.5584 24.6177 19.3817C24.5755 19.3712 24.5326 19.3605 24.4892 19.3497L21.8133 18.6807L21.7771 18.6717C21.2168 18.5316 20.7413 18.4127 20.3384 18.3555C19.9095 18.2946 19.4998 18.2929 19.0793 18.4298C18.6588 18.5667 18.3286 18.8093 18.0177 19.111C17.7257 19.3944 17.4114 19.7705 17.0409 20.2136L17.017 20.2422L14.8316 22.8563C11.7416 21.1823 9.31815 18.7588 7.6441 15.6689ZM16.2176 23.5371C18.3941 24.502 20.8679 25.1361 23.6185 25.4045C24.6576 25.5059 24.9239 25.5123 25.1705 25.4121C25.4182 25.3115 25.6827 25.0716 25.8068 24.8349C25.8583 24.7367 25.9005 24.6019 25.9243 24.3338C25.9493 24.0525 25.95 23.69 25.95 23.1417C25.95 22.2123 25.9366 21.9609 25.8589 21.7686C25.7713 21.5518 25.6245 21.3639 25.4354 21.2263C25.2677 21.1042 25.0271 21.0303 24.1254 20.8049L21.4495 20.1359C20.8433 19.9844 20.4439 19.8855 20.1277 19.8406C19.8288 19.7982 19.6697 19.815 19.5436 19.8561C19.4176 19.8971 19.2791 19.9772 19.0625 20.1874C18.8332 20.4099 18.5686 20.7249 18.1678 21.2043L16.2176 23.5371Z"
          fill="#634675"
        />
      </svg>
    );

  return (
    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.78182 4.59098C8.58952 4.51327 8.33818 4.49992 7.40874 4.49992C6.86047 4.49992 6.49794 4.5006 6.21668 4.5256C5.94856 4.54943 5.81372 4.59155 5.7156 4.64303C5.4789 4.76723 5.23895 5.03173 5.13832 5.27937C5.03811 5.526 5.04457 5.79228 5.14596 6.83137C5.41432 9.58194 6.04842 12.0558 7.01341 14.2323L9.34615 12.282C9.82555 11.8812 10.1406 11.6166 10.3631 11.3874C10.5733 11.1708 10.6533 11.0323 10.6944 10.9062C10.7354 10.7802 10.7523 10.6211 10.7099 10.3222C10.665 10.006 10.5661 9.60661 10.4145 9.00039L9.74556 6.32445C9.52013 5.42276 9.44623 5.18216 9.32419 5.01445C9.18658 4.82534 8.99867 4.67862 8.78182 4.59098ZM7.69415 15.6183L10.3083 13.4328L10.3369 13.4089C10.78 13.0385 11.156 12.7241 11.4394 12.4321C11.7411 12.1213 11.9838 11.7911 12.1207 11.3706C12.2576 10.9501 12.2558 10.5403 12.195 10.1114C12.1378 9.70856 12.0189 9.23303 11.8788 8.67274L11.8698 8.63659L11.2008 5.96065C11.1899 5.91725 11.1793 5.87441 11.1687 5.83212C10.992 5.12246 10.8538 4.5671 10.5371 4.13189C10.2343 3.71583 9.82093 3.39306 9.34386 3.20026C8.84484 2.99859 8.27253 2.99914 7.5412 2.99984C7.49761 2.99988 7.45347 2.99992 7.40874 2.99992L7.37689 2.99992C6.86895 2.99991 6.4394 2.99989 6.0839 3.03149C5.70785 3.06491 5.35695 3.13727 5.01866 3.31477C4.46808 3.60366 3.98272 4.13868 3.74866 4.71471C3.49209 5.34617 3.55746 6.00833 3.6393 6.83727C3.64385 6.88333 3.64845 6.92991 3.65304 6.97703C3.97303 10.2567 4.79186 13.2034 6.07985 15.7668C7.99252 19.5735 10.9265 22.5074 14.7331 24.4201C17.2965 25.7081 20.2433 26.5269 23.5229 26.8469C23.57 26.8515 23.6166 26.8561 23.6626 26.8606C24.4916 26.9425 25.1538 27.0078 25.7852 26.7513C26.3612 26.5172 26.8963 26.0318 27.1852 25.4813C27.3627 25.143 27.435 24.7921 27.4684 24.416C27.5 24.0605 27.5 23.631 27.5 23.1231L27.5 23.0912C27.5 23.0464 27.5001 23.0023 27.5001 22.9587C27.5008 22.2274 27.5013 21.6551 27.2997 21.1561C27.1069 20.679 26.7841 20.2656 26.368 19.9628C25.9328 19.6462 25.3775 19.5079 24.6678 19.3312C24.6255 19.3207 24.5827 19.31 24.5393 19.2992L21.8633 18.6302L21.8272 18.6211C21.2669 18.481 20.7914 18.3621 20.3885 18.305C19.9596 18.2441 19.5498 18.2423 19.1293 18.3792C18.7088 18.5161 18.3786 18.7588 18.0678 19.0605C17.7758 19.3439 17.4614 19.72 17.091 20.1631L17.0671 20.1917L14.8816 22.8058C11.7916 21.1317 9.3682 18.7083 7.69415 15.6183ZM16.2676 23.4865C18.4442 24.4515 20.918 25.0856 23.6686 25.354C24.7076 25.4553 24.9739 25.4618 25.2206 25.3616C25.4682 25.261 25.7327 25.021 25.8569 24.7843C25.9084 24.6862 25.9505 24.5514 25.9743 24.2832C25.9993 24.002 26 23.6395 26 23.0912C26 22.1617 25.9867 21.9104 25.9089 21.7181C25.8213 21.5013 25.6746 21.3133 25.4855 21.1757C25.3178 21.0537 25.0772 20.9798 24.1755 20.7544L21.4995 20.0854C20.8933 19.9338 20.4939 19.835 20.1777 19.7901C19.8788 19.7477 19.7197 19.7645 19.5937 19.8055C19.4676 19.8466 19.3291 19.9266 19.1125 20.1369C18.8833 20.3593 18.6187 20.6744 18.2179 21.1538L16.2676 23.4865Z"
        fill="#005f71"
      />
    </svg>
  );
};

const Activity: React.FC<IconProps> = (props) => {
  const { filled } = props;

  if (filled)
    return (
      <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.06974 11.1923C7.60119 6.94075 11.2153 3.75025 15.5 3.75025C19.7847 3.75025 23.3988 6.94076 23.9303 11.1923L25.1664 21.0815C25.3435 22.4986 24.2386 23.7502 22.8105 23.7502L8.18949 23.7502C6.76139 23.7502 5.65645 22.4986 5.83359 21.0815L7.06974 11.1923Z"
          fill="#E9DAF2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.5001 3.00025C10.8372 3.00025 6.90404 6.4724 6.32567 11.0993L5.08952 20.9885C4.85643 22.8532 6.31041 24.5002 8.18964 24.5002L10.0126 24.5002L10.1276 24.7588C11.0712 26.882 13.1767 28.2502 15.5 28.2502C17.8234 28.2502 19.9289 26.882 20.8725 24.7588L20.9875 24.5002L22.8106 24.5002C24.6899 24.5002 26.1438 22.8532 25.9108 20.9885L24.6746 11.0993C24.0963 6.47241 20.1631 3.00025 15.5001 3.00025ZM20.5172 23.0002C20.506 23 20.4949 23 20.4838 23.0002L10.5163 23.0002C10.5052 23 10.4941 23 10.483 23.0002L8.18964 23.0002C7.21266 23.0002 6.45676 22.144 6.57794 21.1745L7.81409 11.2854C8.29862 7.4091 11.5937 4.50025 15.5001 4.50025C19.4066 4.50025 22.7017 7.4091 23.1862 11.2854L24.4223 21.1745C24.5435 22.144 23.7876 23.0002 22.8106 23.0002L20.5172 23.0002ZM11.6732 24.5002L19.3269 24.5002C18.5596 25.8801 17.0991 26.7502 15.5 26.7502C13.901 26.7502 12.4405 25.8801 11.6732 24.5002Z"
          fill="#634675"
        />
      </svg>
    );

  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0001 3C10.3372 3 6.40404 6.47216 5.82567 11.0991L4.58952 20.9882C4.35643 22.853 5.81041 24.5 7.68964 24.5L9.51265 24.5L9.9256 25.4292L9.9412 25.4642C10.1841 26.0108 10.39 26.4742 10.6005 26.8377C10.8244 27.2246 11.0853 27.5572 11.4679 27.8059C11.8506 28.0545 12.2604 28.1578 12.7049 28.2054C13.1226 28.25 13.6297 28.25 14.2278 28.25L14.2662 28.25L15 28.25L15.7339 28.25L15.7723 28.25C16.3704 28.25 16.8775 28.25 17.2952 28.2054C17.7397 28.1578 18.1495 28.0545 18.5321 27.8059C18.9148 27.5572 19.1757 27.2246 19.3996 26.8378C19.6101 26.4742 19.816 26.0108 20.0589 25.4642L20.0745 25.4292L20.4875 24.5L22.3106 24.5C24.1899 24.5 25.6438 22.853 25.4108 20.9882L24.1746 11.0991C23.5963 6.47216 19.6631 3 15.0001 3ZM20.0172 23C20.006 22.9998 19.9949 22.9998 19.9838 23L10.0163 23C10.0052 22.9998 9.99409 22.9998 9.98295 23L7.68964 23C6.71266 23 5.95676 22.1437 6.07794 21.1743L7.31409 11.2851C7.79862 7.40886 11.0937 4.5 15.0001 4.5C18.9066 4.5 22.2017 7.40886 22.6862 11.2851L23.9223 21.1743C24.0435 22.1437 23.2876 23 22.3106 23L20.0172 23ZM11.1541 24.5L18.846 24.5L18.7038 24.82C18.4411 25.411 18.267 25.8003 18.1015 26.0862C17.9449 26.3566 17.8292 26.4738 17.7148 26.5481C17.6003 26.6225 17.4463 26.6807 17.1357 26.7139C16.8071 26.749 16.3807 26.75 15.7339 26.75L15 26.75L14.2662 26.75C13.6194 26.75 13.193 26.749 12.8644 26.7139C12.5538 26.6807 12.3998 26.6225 12.2853 26.5481C12.1709 26.4738 12.0552 26.3566 11.8986 26.0862C11.7331 25.8003 11.559 25.411 11.2963 24.82L11.1541 24.5Z"
        fill="#005f71"
      />
    </svg>
  );
};

const Profile: React.FC<IconProps> = (props) => {
  const { filled } = props;

  if (filled)
    return (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.5 14.5002C2.5 8.84339 2.5 6.01496 4.25736 4.2576C6.01472 2.50024 8.84315 2.50024 14.5 2.50024H15.5C21.1569 2.50024 23.9853 2.50024 25.7426 4.2576C27.5 6.01496 27.5 8.84339 27.5 14.5002V15.5002C27.5 21.1571 27.5 23.9855 25.7426 25.7429C23.9853 27.5002 21.1569 27.5002 15.5 27.5002H14.5C8.84315 27.5002 6.01472 27.5002 4.25736 25.7429C2.5 23.9855 2.5 21.1571 2.5 15.5002V14.5002ZM20 19.5836C20 17.7426 18.5076 16.2502 16.6667 16.2502H13.3333C11.4924 16.2502 10 17.7426 10 19.5836C10 20.5041 10.7462 21.2502 11.6667 21.2502H18.3333C19.2538 21.2502 20 20.5041 20 19.5836ZM15 12.5002C16.3807 12.5002 17.5 11.381 17.5 10.0002C17.5 8.61953 16.3807 7.50024 15 7.50024C13.6193 7.50024 12.5 8.61953 12.5 10.0002C12.5 11.381 13.6193 12.5002 15 12.5002Z"
          fill="#E9DAF2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.9678 1.75024H15H15.0322C17.1038 1.75024 18.7016 1.75024 19.9827 1.84845C21.2784 1.94778 22.3118 2.1508 23.2411 2.59034C25.0711 3.45586 26.5444 4.92914 27.4099 6.75914C27.8494 7.68847 28.0525 8.72189 28.1518 10.0176C28.25 11.2987 28.25 12.8964 28.25 14.968V14.968V14.968V15.0002V15.0325V15.0325V15.0325C28.25 17.1041 28.25 18.7018 28.1518 19.9829C28.0525 21.2786 27.8494 22.312 27.4099 23.2414C26.5444 25.0714 25.0711 26.5446 23.2411 27.4102C22.3118 27.8497 21.2784 28.0527 19.9827 28.152C18.7016 28.2502 17.1038 28.2502 15.0323 28.2502H15.0322H15.0322H15H14.9678H14.9678H14.9677C12.8962 28.2502 11.2984 28.2502 10.0173 28.152C8.72165 28.0527 7.68823 27.8497 6.75889 27.4102C4.92889 26.5446 3.45562 25.0714 2.59009 23.2414C2.15055 22.312 1.94753 21.2786 1.8482 19.9829C1.75 18.7018 1.75 17.104 1.75 15.0325V15.0002V14.968C1.75 12.8964 1.75 11.2987 1.8482 10.0176C1.94753 8.72189 2.15055 7.68847 2.59009 6.75914C3.45562 4.92914 4.92889 3.45586 6.75889 2.59034C7.68823 2.1508 8.72165 1.94778 10.0173 1.84845C11.2984 1.75024 12.8962 1.75024 14.9678 1.75024ZM10.132 3.34406C8.92285 3.43675 8.09487 3.61778 7.40023 3.94632C5.88394 4.66347 4.66323 5.88419 3.94608 7.40047C3.61753 8.09512 3.43651 8.9231 3.34382 10.1322C3.25051 11.3493 3.25 12.8898 3.25 15.0002C3.25 17.1106 3.25051 18.6512 3.34382 19.8683C3.43651 21.0774 3.61753 21.9054 3.94608 22.6C4.66323 24.1163 5.88394 25.337 7.40023 26.0542C8.09487 26.3827 8.92285 26.5637 10.132 26.6564C11.3491 26.7497 12.8896 26.7502 15 26.7502C17.1104 26.7502 18.6509 26.7497 19.868 26.6564C21.0771 26.5637 21.9051 26.3827 22.5998 26.0542C24.1161 25.337 25.3368 24.1163 26.0539 22.6C26.3825 21.9054 26.5635 21.0774 26.6562 19.8683C26.7495 18.6512 26.75 17.1106 26.75 15.0002C26.75 12.8898 26.7495 11.3493 26.6562 10.1322C26.5635 8.9231 26.3825 8.09512 26.0539 7.40047C25.3368 5.88419 24.1161 4.66347 22.5998 3.94632C21.9051 3.61778 21.0771 3.43675 19.868 3.34406C18.6509 3.25076 17.1104 3.25024 15 3.25024C12.8896 3.25024 11.3491 3.25076 10.132 3.34406ZM13.3333 17.0002C11.9066 17.0002 10.75 18.1568 10.75 19.5836C10.75 20.0898 11.1604 20.5002 11.6667 20.5002H18.3333C18.8396 20.5002 19.25 20.0898 19.25 19.5836C19.25 18.1568 18.0934 17.0002 16.6667 17.0002H13.3333ZM9.25 19.5836C9.25 17.3284 11.0782 15.5002 13.3333 15.5002H16.6667C18.9218 15.5002 20.75 17.3284 20.75 19.5836C20.75 20.9183 19.668 22.0002 18.3333 22.0002H11.6667C10.332 22.0002 9.25 20.9183 9.25 19.5836ZM13.25 10.0002C13.25 9.03375 14.0335 8.25024 15 8.25024C15.9665 8.25024 16.75 9.03375 16.75 10.0002C16.75 10.9667 15.9665 11.7502 15 11.7502C14.0335 11.7502 13.25 10.9667 13.25 10.0002ZM15 6.75024C13.2051 6.75024 11.75 8.20532 11.75 10.0002C11.75 11.7952 13.2051 13.2502 15 13.2502C16.7949 13.2502 18.25 11.7952 18.25 10.0002C18.25 8.20532 16.7949 6.75024 15 6.75024Z"
          fill="#634675"
        />
      </svg>
    );

  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9678 1.75H15H15.0322C17.1038 1.75 18.7016 1.75 19.9827 1.8482C21.2784 1.94753 22.3118 2.15055 23.2411 2.59009C25.0711 3.45562 26.5444 4.92889 27.4099 6.75889C27.8494 7.68823 28.0525 8.72165 28.1518 10.0173C28.25 11.2984 28.25 12.8962 28.25 14.9677V14.9678V14.9678V15V15.0322V15.0322V15.0323C28.25 17.1038 28.25 18.7016 28.1518 19.9827C28.0525 21.2784 27.8494 22.3118 27.4099 23.2411C26.5444 25.0711 25.0711 26.5444 23.2411 27.4099C22.3118 27.8494 21.2784 28.0525 19.9827 28.1518C18.7016 28.25 17.1038 28.25 15.0323 28.25H15.0322H15.0322H15H14.9678H14.9678H14.9677C12.8962 28.25 11.2984 28.25 10.0173 28.1518C8.72165 28.0525 7.68823 27.8494 6.75889 27.4099C4.92889 26.5444 3.45562 25.0711 2.59009 23.2411C2.15055 22.3118 1.94753 21.2784 1.8482 19.9827C1.75 18.7016 1.75 17.1038 1.75 15.0322V15V14.9678C1.75 12.8962 1.75 11.2984 1.8482 10.0173C1.94753 8.72165 2.15055 7.68823 2.59009 6.75889C3.45562 4.92889 4.92889 3.45562 6.75889 2.59009C7.68823 2.15055 8.72165 1.94753 10.0173 1.8482C11.2984 1.75 12.8962 1.75 14.9678 1.75ZM10.132 3.34382C8.92285 3.43651 8.09487 3.61753 7.40023 3.94608C5.88394 4.66323 4.66323 5.88394 3.94608 7.40023C3.61753 8.09487 3.43651 8.92285 3.34382 10.132C3.25051 11.3491 3.25 12.8896 3.25 15C3.25 17.1104 3.25051 18.6509 3.34382 19.868C3.43651 21.0771 3.61753 21.9051 3.94608 22.5998C4.66323 24.1161 5.88394 25.3368 7.40023 26.0539C8.09487 26.3825 8.92285 26.5635 10.132 26.6562C11.3491 26.7495 12.8896 26.75 15 26.75C17.1104 26.75 18.6509 26.7495 19.868 26.6562C21.0771 26.5635 21.9051 26.3825 22.5998 26.0539C24.1161 25.3368 25.3368 24.1161 26.0539 22.5998C26.3825 21.9051 26.5635 21.0771 26.6562 19.868C26.7495 18.6509 26.75 17.1104 26.75 15C26.75 12.8896 26.7495 11.3491 26.6562 10.132C26.5635 8.92285 26.3825 8.09487 26.0539 7.40023C25.3368 5.88394 24.1161 4.66323 22.5998 3.94608C21.9051 3.61753 21.0771 3.43651 19.868 3.34382C18.6509 3.25051 17.1104 3.25 15 3.25C12.8896 3.25 11.3491 3.25051 10.132 3.34382ZM13.3333 17C11.9066 17 10.75 18.1566 10.75 19.5833C10.75 20.0896 11.1604 20.5 11.6667 20.5H18.3333C18.8396 20.5 19.25 20.0896 19.25 19.5833C19.25 18.1566 18.0934 17 16.6667 17H13.3333ZM9.25 19.5833C9.25 17.3282 11.0782 15.5 13.3333 15.5H16.6667C18.9218 15.5 20.75 17.3282 20.75 19.5833C20.75 20.918 19.668 22 18.3333 22H11.6667C10.332 22 9.25 20.918 9.25 19.5833ZM13.25 10C13.25 9.0335 14.0335 8.25 15 8.25C15.9665 8.25 16.75 9.0335 16.75 10C16.75 10.9665 15.9665 11.75 15 11.75C14.0335 11.75 13.25 10.9665 13.25 10ZM15 6.75C13.2051 6.75 11.75 8.20507 11.75 10C11.75 11.7949 13.2051 13.25 15 13.25C16.7949 13.25 18.25 11.7949 18.25 10C18.25 8.20507 16.7949 6.75 15 6.75Z"
        fill="#005f71"
      />
    </svg>
  );
};

interface HBIconProps {
  name: 'newsfeed' | 'mobility' | 'consulting' | 'activity' | 'profile';
  // color: string;
  filled: boolean;
  // size: number;
}

const mappingIcon = {
  newsfeed: Newsfeed,
  mobility: Mobility,
  consulting: Consulting,
  activity: Activity,
  profile: Profile,
};

const HBIcon: React.FC<HBIconProps> = (props) => {
  const Render = mappingIcon[props.name];
  return <Render {...props} />;
};

export default HBIcon;