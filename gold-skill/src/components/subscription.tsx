'use client'

import { useState } from "react";
import Button from "./button";
import { SubscriptionBox } from "./subscription-box";
import { CreateUserSubscription, deleteUserSubscription} from "@/actions/activeUser_actions";


const Subscription = ({subscription, leftdays, subscriptions, userId}: {userId: string | undefined,leftdays: string | number ,subscription: {
  subscription: {
      id: string;
      name: string;
      isActive: boolean;
      description: string;
      period: number;
  };
  createdAt: Date;
  isActive: boolean;
  payments: {
      id: string;
      createdAt: Date;
      userId: string;
      subscriptionId: string;
      currency: string;
      amount: number;
      userSubscriptionId: string | null;
  }[];
}[] | undefined, subscriptions: {
        id: string;
        name: string;
        description: string;
        price: number;
        period: number;
        isActive: boolean;
}[]
}) => {
    const [notification, setNotification] = useState<{message: string | null, type: "error" | "success"}>({message: null, type: "error"});
    const [currentSubscription] = useState(subscription);
    const [currentDaysLeft] = useState(leftdays);
    const [isCancelModalOpen, setCancelModalOpen] = useState(false);
    const [isChanging, setChanging] = useState(false);
    const [isChangeModalOpen, setChangeModalOpen] = useState(false);
    const [wantedSubscription, setWantedSubscription] = useState<string | null>(null);

    const confirmCancel = async () => {
       setNotification({message: null, type: "error"});
       if (!userId) return;
        setCancelModalOpen(false);
        if (!currentSubscription) return;
        const response = await deleteUserSubscription(currentSubscription[0].subscription.id)
        if ( response) {
          setNotification({message: "Wystąpił błąd podczas anulowania subskrybcji", type: "error"});
        } else {    
          setNotification({message: "Subskrybcja anulowana pomyślnie.", type: "success"});
        }
      };

    const handleChange = (subscriptionId: string) => {
      setWantedSubscription(subscriptionId);
        setChangeModalOpen(true);
    }
    const confirmChange = async() => {
        setNotification({message: null, type: "error"});
        if (!wantedSubscription) return;
        if (!userId) return;
        console.log("Subscription changed");
        setChangeModalOpen(false);
        const response = await CreateUserSubscription(userId, wantedSubscription as string)

        if(response && response.type === "error") {
          setNotification({message: "Wystąpił błąd podczas zmiany subskrybcji", type: "error"});
        }
    } 

    return (
        <>
        {notification.message && (
          <div>
            <p className={`text-${notification.type === "error" ? "red" : "green"}-500`}>
              {notification.message}
            </p>
          </div>
        )}
        {isChanging && <Button type="button" width={"100px"} onClick={() => setChanging(false)}>Cofnij</Button>}
        {!isChanging && <div className="p-6 border rounded-lg shadow-md bg-white max-w-lg">
         {currentSubscription ? (
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              Aktywna subskrybcja: {currentSubscription[0].subscription.name}
            </h2>
            {currentSubscription[0].subscription.description.split(',').map((text) => {
                return <p className="text-gray-700" key={text}>{text}</p>;
  
            })}
            <p className="text-gray-600 mt-2">
              {currentSubscription[0].subscription.period === 999 ? "Subskrybcja na zawsze" : currentDaysLeft === 0
                ? "Twoja subskrybcja się skończyła"
                : `Pozostało dni: ${currentDaysLeft}`}
            </p>
  
            {currentSubscription[0].subscription.name.toLowerCase() !== "lifetime" && (
              <div className="mt-4 flex gap-4">
                <Button type="button" width={"100px"} onClick={() => setChanging(true)}>Zmień</Button>
                <Button type={"button"} width={"100px"} onClick={() => setChanging(false)}>Anuluj</Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-700">Nie masz aktywnej subskrybcji.</p>
            <Button type="button" width={"200px"} onClick={() => setChanging(true)}>Wybierz subskrybcję</Button>
          </div>
        )}
        </div>}
        {isChanging && <ul className="grid lg:grid-cols-3 gap-8 grid-cols-1">
        {
        subscriptions.filter((s)=>s.isActive && s.price !== 0).map((subscription) => {return (
          <SubscriptionBox goBack={() => setChanging(false)} confirm={ () => handleChange(subscription.id)}type="regular"{...subscription} fullcost={subscription.price === 99 ? "" : subscription.price === 499 ? "595" : "1188"} key={subscription.id} isSelected={currentSubscription && subscription.id === currentSubscription[0].subscription.id}/>
        )})
        }
      </ul>}

              {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-bold text-gray-900">Chcesz anulować subskrybcję?</h3>
            <p className="text-gray-700 mt-2">
                Jeśli ją anulujesz, Twoja subskrybcja pozostanie aktywana do końca aktualnego okresu. Kolejna płatność nie zostanie pobrana
            </p>
            <div className="mt-4 flex justify-end space-x-4">
            <Button type="button" width={"100px"} onClick={() => setCancelModalOpen(false)}>Cofnij</Button>
            <Button type={"button"} width={"200px"} onClick={confirmCancel}>Anuluj subskrybcję</Button>
            </div>
          </div>
        </div>
      )}
      {isChangeModalOpen && (currentSubscription && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-bold text-gray-900">Chcesz zmienić subskrybcję?</h3>
            <p className="text-gray-700 mt-2">
                Jeśli ją zmienisz, Twoja subskrybcja pozostanie aktywana do końca aktualnego okresu. Zostaniesz przeniesiony do strony płatności Przelewy24, a nowa subskrybcja zacznie działać po upływie aktualnej.
            </p>
            <div className="mt-4 flex justify-end space-x-4">
            <Button type="button" width={"100px"} onClick={() => setChangeModalOpen(false)}>Cofnij</Button>
            <Button type={"button"} width={"200px"} onClick={confirmChange}>Zmień subskrybcję</Button>
            </div>
          </div>
        </div>
      )) || 
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-bold text-gray-900">Chcesz kupić subskrybcję?</h3>
        <p className="text-gray-700 mt-2">
            Zostaniesz przeniesiony do strony płatności Przelewy24 i po zakończeniu płatności Twoja subskrybcja zacznie działać od razu.
        </p>
        <div className="mt-4 flex justify-end space-x-4">
        <Button type="button" width={"100px"} onClick={() => setChangeModalOpen(false)}>Cofnij</Button>
        <Button type={"button"} width={"200px"} onClick={confirmChange}>Kup subskrybcję</Button>
        </div>
      </div>
    </div>}
    </>
    );
  };

export {Subscription}