'use client'

import { useState } from "react";
import Button from "./button";
import { SubscriptionBox } from "./subscription-box";

const Subscription = ({subscription, leftdays, subscriptions}: {leftdays: string | number ,subscription: {
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

    const [currentSubscription] = useState(subscription)
    const [currentDaysLeft] = useState(leftdays)
    const [isCancelModalOpen, setCancelModalOpen] = useState(false);
    const [isChanging, setChanging] = useState(false)
    const [isChangeModalOpen, setChangeModalOpen] = useState(false)

    const handleCancel = async () => {
         setCancelModalOpen(true);
    }

    const confirmCancel = () => {
        console.log("Subscription canceled");
        setCancelModalOpen(false);
        // TODO: Add API call to cancel subscription
      };

    const handleBack = () => {
        setChanging(false)
    }

    const handleChange = () => {
        setChangeModalOpen(true);
    }
    const confirmChange = () => {
        console.log("Subscription changed");
        setChangeModalOpen(false);
        // TODO: Add API call to change subscription
    }

    return (
        <>
        {isChanging && <Button type="button" width={"100px"} onClick={handleBack}>Cofnij</Button>}
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
              {currentDaysLeft === 0
                ? "Twoja subskrybcja się skończyła"
                : `Pozostało dni: ${currentDaysLeft}`}
            </p>
  
            {currentSubscription[0].subscription.name.toLowerCase() !== "lifetime" && (
              <div className="mt-4 flex gap-4">
                <Button type="button" width={"100px"} onClick={() => setChanging(true)}>Zmień</Button>
                <Button type={"button"} width={"100px"} onClick={handleCancel}>Anuluj</Button>
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
          <SubscriptionBox goBack={handleBack} confirm={handleChange}type="regular"{...subscription} fullcost={subscription.price === 99 ? "" : subscription.price === 499 ? "595" : "1188"} key={subscription.id} isSelected={currentSubscription && subscription.id === currentSubscription[0].subscription.id}/>
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
      {isChangeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-bold text-gray-900">Chcesz zmienić subskrybcję?</h3>
            <p className="text-gray-700 mt-2">
                Jeśli ją zmienisz, Twoja subskrybcja pozostanie aktywana do końca aktualnego okresu. Zostaniesz przeniesiony do okna płatności, a nowa subskrybcja zacznie działać po upływie aktualnej.
            </p>
            <div className="mt-4 flex justify-end space-x-4">
            <Button type="button" width={"100px"} onClick={() => setChangeModalOpen(false)}>Cofnij</Button>
            <Button type={"button"} width={"200px"} onClick={confirmChange}>Zmień subskrybcję</Button>
            </div>
          </div>
        </div>
      )}
    </>
    );
  };

export {Subscription}